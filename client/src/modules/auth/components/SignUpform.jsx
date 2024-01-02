import React from 'react'
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';


function SignUpform(props) {
    const { onFinish, onFinishFailed } = props
    return (
        <div className='SignUpForm'>
            <div className="container">
                <h1 >Hello</h1>
                <p style={{ marginBottom: 10 }}>
                    Chào mừng bạn đến với Travel project . Hãy đăng ký tài khoản để bắt đầu du lịch nào 
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
                    label="Gmail"
                    name="gmail"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Gmail!',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '100%' }}
                        placeholder='Nhập Gmail của bạn'
                    />
                </Form.Item>
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
                            width: "100%",
                            background: "#162D3A",
                            marginTop: "25px"
                        }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: "center" }}>
                Đã có tài khoản ? <Link to={'/sign-in'}> Đăng nhập ngay</Link>
            </div>
        </div>
    )
}

export default SignUpform