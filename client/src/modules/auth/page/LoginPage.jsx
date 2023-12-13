import React from 'react'
import "../scss/LoginPage.css"
import LogInForm from '../components/LogInForm'
import { postAPIsignIn } from '../../../config/api';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../redux/UserReducer';

function LoginPage() {

    const dispatch = useDispatch();
    const nav = useNavigate()
    const onFinish = async (values) => {
        try {
            const res = await postAPIsignIn('api/sign-in', values)
            if (res?.status == 200) {
                Cookies.set('TravelAccount', res?.data.data.token);
                const data = res?.data.data;
                delete data.token;
                delete data._id;
                const action = userLogin(data);
                dispatch(action);
                message.open({
                    type: 'loading',
                    content: 'Đang đăng nhập . . . .',
                    duration: 2.5,
                }).then(() => message.success('Đăng nhập thành công', 2.5))
                nav('/')
            }
        } catch (error) {
            console.log(error);
            message.open({
                type: 'loading',
                content: 'Đang đăng nhập . . . .',
                duration: 2.5,
            }).then(() => message.error('Đăng nhập thất bại', 2.5))
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="sign-in-page">
            <div className="left-container">
                <LogInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div>
            <div className="right-container">
                <img src="https://i.pinimg.com/564x/04/3e/93/043e9378e4f8836707037e813d302c89.jpg" alt="" />
            </div>
        </div>
    )

}

export default LoginPage
