import React from 'react'
import logoImgage from '../../../img/LogoProject.png'
import logoImgage2 from '../../../img/LogoProject2-removebg-preview.png'
import { useNavigate } from 'react-router';
import { Button, Dropdown, Space, Flex, Avatar, message } from 'antd';
import { SearchOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { UserData } from '../../auth/redux/UserReducer';
import { BASE_URL } from '../../../config/api';
import { Link } from 'react-router-dom';


function HeaderPage() {
  const nav = useNavigate()
  const User = useSelector(UserData)

  const url = 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/346485998_786097866452068_4022572448692318652_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=HharkQeOwTsAX_Z2lgH&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCka2pkdjBaoUXyKP8SZ4L1Hn_IbLFNb_gIsafkEn_ZOQ&oe=657C702A';

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" onClick={() => { nav('/user') }}>
          Thông tin cá nhân
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" onClick={() => { nav('/change-password') }}>
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" onClick={() => { nav('/user/tour') }}>
          Tất cả lịch booking
        </a>
      ),
    },



    {
      key: '5',
      label: (
        <a
          target="_blank"
          onClick={() => {
            nav('/sign-in')
            localStorage.removeItem('TravelAccount')
            Cookies.remove('TravelAccount')
            message.success('Đăng xuất thành công', 2)
          }}>
          Đăng xuất
        </a>
      ),
    },
  ];

  if (User.role == 2) {
    items.splice(3, 0,
      {
        key: '4',
        label: (
          <a target="_blank" onClick={() => { nav('/admin') }}>
            Trang quản trị
          </a>
        ),
      },);
  }

  return (
    <div className='header-page'>
      <div className="left-container">
        <div className="logo">
          <Link to={'/'}>
            <img src={logoImgage2} alt="" />
          </Link>
        </div>
      </div>
      <div className="center-container">
        <div className="btn-Home">
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={() => { { nav('/') } }}
          >
            Trang chủ
          </Button>
        </div>
        <div className="btn-search">
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={() => { { nav('/search') } }}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div className="right-container">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button
            type='text'
            icon={<MenuOutlined />}
            style={{
              width: '160px',
              height: '60px'
            }}
          >
            {User ? User.username : "Loading . . ."}

            <Avatar
              src={<img src={User ? BASE_URL + User.avatar : url} alt="avatar" />}
              style={{
                marginLeft: '10px',
              }}
            />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default HeaderPage