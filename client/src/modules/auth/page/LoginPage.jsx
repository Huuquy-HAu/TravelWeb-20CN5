import React from 'react'
import "../scss/LoginPage.css"
import LogInForm from '../components/LogInForm'

function LoginPage() {
    const onFinish = (values) => {
        console.log('Success:', values);
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
