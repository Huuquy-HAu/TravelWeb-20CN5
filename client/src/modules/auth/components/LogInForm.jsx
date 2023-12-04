import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";

function LogInForm(props) {
    const { onFinish, onFinishFailed } = props
    const nav = useNavigate()

    return (
        <div className='logIn-form'>
            <div className="left-container-header">
                <h1 >Welcome Back</h1>
                <p style={{marginBottom: 10}}>
                    Hôm nay là một ngày mới, là ngày của bạn. Hãy bắt đầu quản lý hành trình du lịch của mình bằng cách đăng nhập ngay.
                </p>
            </div>
            <Form
                name="basic"
                style={{
                    width: '100%',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập UserName!',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '100%' }}
                        placeholder='Nhập username của bạn'
                    />
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu của bạn!',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Nhập password của bạn'
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        style={{
                            width:"100%",
                            background:"#162D3A",
                            marginTop:"25px"
                        }}
                        >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div style={{textAlign:"center"}}>
                Chưa có tài khoản ? <Link to={'/sign-up'}> Đăng ký ngay</Link>
            </div>
        </div>
    )
}

export default LogInForm