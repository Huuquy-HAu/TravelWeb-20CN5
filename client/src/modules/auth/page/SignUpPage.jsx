import React from 'react'
import "../scss/SignUpPage.scss"
import SignUpform from '../components/SignUpform'
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { postAPIsignIn } from '../../../config/api';

function SignUpPage() {
  const nav = useNavigate()
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await postAPIsignIn('api/sign-up', values)
      if (res?.status == 200) {
        message.open({
            type: 'loading',
            content: 'Đang đăng ký . . . .',
            duration: 2.5,
        }).then(() => message.success('Đăng ký tài khoản thành công , Bạn sẽ được chuyển về trang đăng nhập', 2.5))
        nav('/sign-in')
    }
    } catch (error) {
      console.log(error);
      message.open({
        type: 'loading',
        content: 'Đang đăng ký . . . .',
        duration: 2.5,
      }).then(() => message.error('Đăng ký thất bại', 2.5))
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='SignUpPage-container'>
      <SignUpform onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </div>

  )
}

export default SignUpPage