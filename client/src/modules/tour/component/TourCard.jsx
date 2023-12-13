import React from 'react'
import '../scss/TourCard.scss'
import { useNavigate } from 'react-router'

function TourCard() {

  const nav = useNavigate()

  return (
    <div className='tour-card-component'>
      <div className="tour-img">
        <img src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp" alt="" />
      </div>
      <div className="tour-content-component">
        <div className="header-component">
          <span>
            Phú Quốc
          </span>
        </div>
        <div className="content-component">
          Tour Phú Quốc 2N2Đ 
        </div>
      </div>
      <div className="tour-action">
        <div className="left-action">2,000,000Đ</div>
        <div className="right-action">
          <button
            onClick={() => {nav('./tour/'+1)}}
          >
            Đặt Ngay
          </button>
        </div>  
      </div>  
    </div>
  )
}

export default TourCard