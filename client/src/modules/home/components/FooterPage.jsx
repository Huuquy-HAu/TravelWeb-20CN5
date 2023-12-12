import React from 'react'
import logoImgage2 from '../../../img/LogoProject2-removebg-preview.png'
import {FacebookFilled } from '@ant-design/icons';


function FooterPage() {
  return (
    <div className='footerPage-container'>
      <div className="header-container">
        <div className="nav-content">
          <img src={logoImgage2} alt="" />
          <p>
            Travel Project - địa chỉ tin cậy cho mọi chuyến du lịch trong nước.
            Chúng tôi mang đến cho bạn những tour du lịch đa dạng,
            hấp dẫn với mức giá cạnh tranh.
            Hãy cùng Travel Project khám phá Việt Nam ngay hôm nay!
          </p>
        </div>
        <div className="nav-content">
          <div className="header">
            Giới thiệu
          </div>
          <div className="content-nav">
            <div>
              Về chúng tôi
            </div>
            <div>Hotline : +84 389 332 572</div>
            <div>
              quyhuu19@gmail.com
            </div>
          </div>
        </div>
        <div className="nav-content">
          <div className="header">
            Điểm đến
          </div>
          <div className="content-nav">
            <div>
              Phú Quốc
            </div>
            <div>Cát Bà</div>
            <div>
              Sapa
            </div>
          </div>
        </div>
      </div>
      <div className="body-container">
        <div className="left-container">@ 2023 Dương Hữu Quý. All rights reserved</div>
        <div className="right-container"><FacebookFilled /></div>
      </div>
    </div>
  )
}

export default FooterPage