import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import District from './District';
const { RangePicker } = DatePicker;
import '../scss/AddTour.scss'
import { postAPI } from '../../../config/api';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

function AddTour() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dataFile, setDataFile] = useState(new FormData())
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();

  const [loadingImg, setLoadingImg] = useState([false, false, false, false, false, false, false, false, false]);
  const [imageUrlTour, setImageUrlTour] = useState(['', '', '', '', '', '', '', '', '']);

  const nameImg = ['* Ảnh bìa', 'Hình ảnh 1', 'Hình ảnh 2', 'Hình ảnh 3', 'Hình ảnh 4', 'Hình ảnh 5', 'Hình ảnh 6', 'Hình ảnh 7', 'Hình ảnh 8']

  const onFinish = async (values) => {
    let date = ''
    values.schedule.map((val, index) => {
      date += (index == 1 ? "-" + new Date(val.$d).toLocaleDateString() : new Date(val.$d).toLocaleDateString())
      return date
    })
    values.schedule = date
    console.log('Success:', values);
    dataFile.append('name', values.name);
    dataFile.append('originalPrice', values.originalPrice*1);
    dataFile.append('discountPercentage', values.discountPercentage*1);
    dataFile.append('destination' , values.destination)
    dataFile.append('schedule' , values.schedule)
    console.log(dataFile);
    try {
      const res = await postAPI('api/tour', dataFile)
      message.open({
        type: "success",
        content: "Thêm mới thành công",
        style: {
          marginTop: '40px'
        }
      })
    } catch (error) {
      message.open({
        type: "error",
        content: "Thất bại",
        style: {
          marginTop: '40px'
        }
      })
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeAvatar = async (info) => {
    const formData = new FormData()
    formData.append('thumbnail', info.file.originFileObj)
    console.log('formData', info.file.originFileObj);
    setDataFile(formData)

    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const handleChange = (info, index) => {
    console.log(info.file.originFileObj);
    // dataFile.append('images', info.file.originFileObj)
    // setDataFile(dataFile)
    console.log(53, info);
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, (url) => {
        let data = [...imageUrlTour]
        data[index] = url
        setImageUrlTour(data);
      });
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoadingImg(true);
        setImageUrlTour(url);
      });
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const uploadButtonImg = (index) => {
    return (
      (
        <div>
          {loadingImg[index] ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
          </div>
        </div>
      )
    )
  };

  return (
    <div className='add-tour-page'>
      <div className="add-tour-header">
        <h1>Thêm 1 Tour mới </h1>
      </div>
      <div className="add-tour-form">
        <Form
          name="basic"
          style={{
            width: "100%",
          }}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên của chuyến đi "
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trốn Tên!',
              },
            ]}
          >
            <Input
              showCount
              maxLength={100}
              placeholder='Nhập tên tour'
            />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="originalPrice"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <Input
              type='Number'
              min={0}
              placeholder='Nhập vào đây'

            />
          </Form.Item>

          <Form.Item
            label="Giảm giá (%)"
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <Input
              type='Number'
              placeholder='Nhập vào đây'
              max={100}
              min={0}

            />
          </Form.Item>

          <Form.Item
            label="Địa điểm "
            name="destination"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <District form={form}/>
          </Form.Item>

          <Form.Item
            label="Lịch trình "
            name="schedule"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <RangePicker format={dateFormat} />
          </Form.Item>


          <Form.Item
            label="Ảnh Đại diện"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <Upload
              name="thumbnail"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeAvatar}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

{/* 
          <Form.Item
            label="Ảnh chi tiết "
            name="images"
          >
            <div
              style={{
                display:'flex',
                flexWrap:'wrap'
              }}
            >
              {imageUrlTour.map((data, index) => {
                return (
                  <div
                    className='add-img-upload-item'
                  >
                    <div>
                      <Form.Item>
                        <Upload
                          name="images"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                          onChange={(file) => { handleChange(file, index) }}
                        >
                          {imageUrlTour[index] ? (
                            <img
                              src={imageUrlTour[index]}
                              alt="avatar"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            uploadButtonImg(index)
                          )}
                        </Upload>
                      </Form.Item>
                    </div>
                    <p className='p-des-item-special'>{name[index]}</p>
                  </div>
                )
              })}
            </div>

          </Form.Item>
 */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}

export default AddTour