import React, { useEffect, useState } from 'react'
import { BASE_URL, getAPI, patchAPI, postAPI } from '../../../config/api'
import { Button, Form, Modal, Table, Upload, Select, Input, message, Image, DatePicker } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import '../scss/AllTour.scss';
dayjs.extend(customParseFormat);



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


function AllTour() {
  const [listData, setListData] = useState([])
  const { Column } = Table
  const [count, setCount] = useState(0)
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const [dataFile, setDataFile] = useState(new FormData())
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourId, setTourID] = useState('')
  const [loading, setLoading] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const [dayModal, setDayModal] = useState()



  const getAllTour = async (req, res) => {
    try {
      const res = await getAPI('/api/tour');
      console.log(res);
      const newData = []
      res?.data.data.map((value, index) => {
        newData.push(
          {
            _id: value._id,
            name: value.name,
            destination: value.destination,
            originalPrice: value.originalPrice,
            discountPercentage: value.discountPercentage,
            schedule: value.schedule,
            active: value.active,
            thumbnail: value.thumbnail.startsWith('https') ? <Image className='preview-img' src={value.thumbnail} /> : <Image className='preview-img' src={BASE_URL + value.thumbnail} />
          }
        )
      })
      setListData(newData)
    } catch (error) {
      console.log(error);
    }
  }


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


  useEffect(() => {
    getAllTour()
  }, [count])


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

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = async (values) => {
    let date = ''

    values.schedule.map((val, index) => {
      const day = dayjs(val.$d)
      date += (index == 1 ? "-" + day.format('DD/MM/YYYY') : day.format('DD/MM/YYYY'))
      return date
    })

    values.schedule = date
    dataFile.append('name', values.name);
    dataFile.append('originalPrice', values.originalPrice*1);
    dataFile.append('discountPercentage', values.discountPercentage*1);
    dataFile.append('destination' , values.destination)
    dataFile.append('schedule' , values.schedule)
    try {
      const res = await patchAPI('api/tour/'+tourId, dataFile)
      message.success(res?.data.message)
    } catch (error) {
      message.error('Thất Bại')
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='all-tour-page'>
      <div className="all-tour-page-header">
        <h1>Tất cả các Tour trong hệ thống</h1>
      </div>
      <div className="all-tour-page-body">
        <Table
          dataSource={listData}
        >
          <Column
            title='Tên của chuyến đi '
            dataIndex='name'
            className='column-list-product'
            onPreview='handlePreview'
          />
          <Column
            title='Địa điểm'
            dataIndex='destination'
            width='20%'
            className='column-list-product' />
          <Column
            title='Giá gốc'
            dataIndex='originalPrice'
            className='column-list-product' />
          <Column
            title='Giảm giá (%)'
            dataIndex='discountPercentage'
            className='column-list-product' />
          <Column
            title='Lịch trình'
            dataIndex='schedule'
            className='column-list-product' />
          <Column
            title='Trạng thái '
            dataIndex='active'
            className='column-list-product'
            render={(record, index) => {
              const handleChange = async (value) => {
                console.log(76, value);
                console.log(index._id);
                try {
                  const res = await patchAPI(BASE_URL + 'api/tour/active?idStatus=' + index._id + '&active=' + value)
                  console.log(res);
                  if (res?.data.status == 200) {
                    setCount(count + 1)
                    message.open({
                      type: "success",
                      content: "Đổi status thành công",
                      style: {
                        marginTop: '40px'
                      }
                    })
                  }

                } catch (error) {
                  console.log(error);
                }
              };
              return (
                <span>
                  <Select
                    value={record}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "hide",
                        label: 'Ẩn bài viết'
                      },
                      {
                        value: "show",
                        label: 'Hiện bài viết'
                      }
                    ]}
                  />
                </span>
              )
            }}
          />
          <Column
            title='Sửa thông tin'
            dataIndex='operation'
            className='column-list-product'
            render={(record, index) => {
              const showModal = () => {
                setImageUrl(index.thumbnail.props.src)
                console.log(index.schedule.split('-'));
                form.setFieldsValue(
                  {
                    name: index.name,
                    originalPrice: index.originalPrice,
                    discountPercentage: index.discountPercentage,
                    destination: index.destination
                  })
                setTourID(index._id)
                setDayModal({ startDate: index.schedule.split('-')[0], endDate: index.schedule.split('-')[1] })
                setIsModalOpen(true);
              };
              return (
                <span>
                  <Button
                    className='btn-list-product'
                    type="primary"
                    onClick={showModal}
                  >
                    Sửa
                  </Button>
                </span>
              )
            }}
          />
        </Table>
      </div>

      <Modal
        title="Sửa thông tin"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: false,
          className: 'btn-ok'
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
          <Form.Item
            label="Tên "
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
            label="Địa điểm"
            name="destination"
            rules={[
              {
                required: true,
                message: 'Không bỏ trống trường này ',
              },
            ]}
          >
            <Input
              placeholder='Nhập vào đây'
              showCount
              max={100}
            />
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
            <RangePicker
              defaultValue={[dayjs(dayModal?.startDate, dateFormat), dayjs(dayModal?.endDate, dateFormat)]}
              format={dateFormat} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default AllTour