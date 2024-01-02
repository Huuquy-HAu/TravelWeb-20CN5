import React from 'react'
import { Button, Upload, Col, Row, Modal, Checkbox, Form, Input, DatePicker, Space, Select, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL, getAPI, patchAPI, postAPI } from '../../../config/api'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../scss/UserProfile.css'
import { userLogin } from '../../auth/redux/UserReducer';
const { Option } = Select;



// Upload file logic

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

function UserProfile() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0)
    const token = window.localStorage.getItem('user')
    const [data, setData] = useState({})
    const [birthDay, setBirthDay] = useState('1970/01/01')
    const [sex, setSex] = useState('')
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [formImg, setFormImg] = useState(new FormData())
    const key = 'updatable';
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    let linkk = ''




    const success = () => {
        message.loading({
            content: 'Loading...',
            key,
        });


        setTimeout(() => {
            message.success({
                content: 'Đổi ảnh đại diện thành công',
                key,
                duration: 2,
            });
        }, 1000);
    };


    const errorMess = () => {
        message.error('Thất bại ! Hãy xem lại kết nối hoặc chọn lại ảnh');
    };

    const getData = async () => {
        try {
            let res = await getAPI('api/user')
            console.log(res);
            linkk = res.data.data.avatar

            if (!linkk) {
                linkk = 'https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg'
            }

            if (!linkk.startsWith('https')) {
                linkk = BASE_URL + linkk
            }
            console.log(linkk);

            setImageUrl(linkk)
            setData(res.data.data)
            setSex(res.data.data.gender)
            // setBirthDay((res.data.user.dateOfBirth.split('T'))[0].split('-').join('-'))
            form.setFieldsValue({
                phoneNumber: Number(res?.data.data.phoneNumber),
                // gender : res.data.data.gender
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [count])


    // Form-edit

    const onFinish = async (values) => {
        try {
            console.log(values);
            let res = await postAPI('api/user', values)
            if (res?.data.status == 200) {
                const ress = await getAPI('api/user')
                const action = userLogin(ress.data.data);
                dispatch(action)
                setCount(count + 1)
                console.log(res);
                return message.success('Đổi thông tin thành công');
            }
            return message.error("Thất bại")
        } catch (error) {
            console.log(error);
            message.error('Thất bại')
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange2 = (date, dateString) => {
        console.log(168, dateString);
        setBirthDay(dateString)
    };

    const handleChange = (values) => {
        console.log(values);
        setSex(values)
    };

    // Upload logic

    const handleChange2 = (info) => {
        const formData = new FormData()
        formData.append('avatar', info.file.originFileObj)
        console.log(112, info);
        setFormImg(formData)

        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    };



    const onFinishAvatar = async (values) => {
        try {
            const res = await patchAPI('api/user/avatar', formImg)
            console.log(res);
            const ress = await getAPI('api/user')
            const action = userLogin(ress.data.data);
            dispatch(action)
            setCount(count + 1)
            success()
        } catch (error) {
            console.log(error);
            errorMess()
        }
    };

    const changeDate = (event) => {
        console.log(event.target.value);
        setBirthDay(event.target.value)
    }

    const changeSex = (event) => {
        setSex(event.target.value)
    }



    return (
        <div className='user-profile'>
            <div className="profile-header">
                <h3>Hồ Sơ Của Tôi</h3>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className="profile-body">
                <div className="body-left">

                    <Row className='email'>
                        <Col span={6} >Tên Đăng Nhập</Col>
                        <Col span={18}><Input disabled={true} value={data.gmail ? data.gmail : "Đang tải . . . "} /></Col>
                    </Row>
                    <Row className='email'>
                        <Col span={6}>Username:</Col>
                        <Col span={18}>
                            <Input className='inp-user' disabled={true} type="text" value={data.username ? data.username : "Đang tải . . . "} />
                        </Col>
                    </Row>

                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label=""
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng không để trống hoặc không được trùng thông tin cũ!',
                                },
                            ]}
                        >
                            <Row>
                                <Col span={6}>Phone: </Col>
                                <Col span={18}>
                                    <Input className='inp-phone' type="Number" defaultValue={data.phoneNumber} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="gender"
                        >

                            <Row>
                                <Col span={6}>Giới tính: </Col>
                                <Col span={18}>
                                    <select 
                                        name="" 
                                        id="inp-sex" 
                                        value={sex} 
                                        onChange={(e) => { changeSex(e) }}
                                        style={{
                                            width:"100%",
                                            padding:'8px 16px'
                                        }}
                                        >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                    </select>
                                </Col>
                            </Row>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đổi thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <div className="body-right">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishAvatar}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange2}
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
                                    64
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <p>Dung lượng tối đa 1MB <br /> Định dạng: .JPEG, .PNG</p>
                        </Form.Item>

                        <Form.Item >
                            <Button className='btn-change-avatar' type="primary" htmlType="submit">
                                Đổi ảnh đại diện
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>


        </div>
    )
}

export default UserProfile