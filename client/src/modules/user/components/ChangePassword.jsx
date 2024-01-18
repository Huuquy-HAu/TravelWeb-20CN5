import React from 'react'
import '../scss/changePassword.scss'
import { Button, Checkbox, Form, Input, message } from 'antd';

function ChangePassword() {

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Thành công')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Thất bại')
  };

  return (
    <div className='change-password-page'>
      <Form
        name="basic"
        labelCol={{
          span: 14,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="old-password"
          rules={[
            {
              required: true,
              message: 'Không để trống trường này !',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới "
          name="new-password"
          rules={[
            {
              required: true,
              message: 'Không được để trống trường này!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu 
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePassword