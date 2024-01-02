import React, { useEffect } from 'react'
import { EditOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UserData } from '../../auth/redux/UserReducer';
import { ROUTES } from '../../../config/routes';
import { BASE_URL } from '../../../config/api';



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const items = [
    getItem('Tài khoản của tôi', 'sub1', <UserOutlined />, [
        getItem(<Link to={ROUTES.user}>Hồ sơ </Link>, '1'),
        getItem(<Link to={ROUTES.user_change_password}>Đổi mật khẩu </Link>, '2'),
    ]),
    getItem(<Link to={ROUTES.user_tour}>Tour của bạn</Link>, 'sub2', <FileDoneOutlined />),
]; // submenu keys of first level

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function MenuProfile() {
    const token = window.localStorage.getItem('user')
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [Url, setUrl] = useState('')
    const [count, setCount] = useState(0)
    const User = useSelector(UserData)


    let link = User.avatar

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    if (!link.startsWith('https')) {
        link = BASE_URL + link
    }

    return (
        <div className='menu'>
            <div className="menu-header">
                <div className="header-left">
                    <img src={User.avatar ? link : "https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg"} alt="" />
                </div>
                <div className="header-right">
                    <h5>{User.username ?  User.username : "Đang tải"}</h5>
                    <p><EditOutlined /> Sửa hồ sơ</p>
                </div>
            </div>
            <div className="menu-list">
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{
                        width: '100%',
                        background: '#fff'
                    }}
                    items={items}
                />
            </div>
        </div>
    )
}

export default MenuProfile