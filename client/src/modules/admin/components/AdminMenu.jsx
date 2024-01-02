import React from 'react'
import { FormOutlined, ShoppingOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../scss/AdminMenu.css'
import { Link } from 'react-router-dom';



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
    
    getItem('Quản lí sản phẩm', 'sub2', <ShoppingOutlined />, [
        getItem(<Link to={'/admin/tour'}>Tất Cả Tour</Link>, '5'),
        getItem(<Link to={'/admin/tour/add-tour'}>Thêm Tour</Link>, '6'),
    ]),
    getItem('Quản lí đơn hàng', 'sub3', <SettingOutlined />, [
        getItem(<Link to={'/admin/booking'}>Tất cả đơn đặt Tour</Link>, '8'),
    ]),
    getItem('Quản lí hồ sơ', 'sub4', <SettingOutlined />, [
        getItem(<Link to={'/user'}>Trang cá nhân</Link>, '7'),
    ]),
];

function AdminMenu() {


    return (
        <div className='menu-admin'>
                <Menu
                    style={{
                        width: '20%',
                        position: "fixed",
                        left:'0'
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                    mode="inline"
                    items={items}
                />

        </div>



    )
}

export default AdminMenu