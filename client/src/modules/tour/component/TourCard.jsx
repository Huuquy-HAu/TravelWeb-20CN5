import React from 'react'
import '../scss/TourCard.scss'
import { useNavigate } from 'react-router'
import { postAPI } from '../../../config/api'
import { message } from 'antd'

function TourCard(props) {

  const nav = useNavigate()
  const { dataCard } = props

  function formatCurrency(amount) {
    // Chuyển đổi số thành chuỗi và tách phần nguyên và phần thập phân (nếu có)
    const [integerPart, decimalPart] = amount.toString().split('.');

    // Định dạng phần nguyên bằng cách thêm dấu phân cách mỗi ba số 0
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Kết hợp phần nguyên đã định dạng và phần thập phân (nếu có)
    const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedAmount;
  }

  const CreateTour = async () => {
    try {
      const res = await postAPI('/api/booking', {
        tourId: dataCard?._id,
        price: formatCurrency(dataCard.originalPrice - (dataCard.originalPrice * (dataCard.discountPercentage != 0 ? (dataCard.discountPercentage / 100) : 0))),
        startDate: dataCard.schedule.split('-')[0]
      })

      console.log(res);
      message.success(res?.data.message);
      a
    } catch (error) {
      message.error(error?.response.data.message)
      console.log(error);
    }
  }

  return (
    <div className='tour-card-component'>
      <div className="tour-img">
        <img src={dataCard.thumbnail ? dataCard.thumbnail : 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp'} alt="" />
      </div>
      <div className="tour-content-component">
        <div className="header-component">
          <span>
            {dataCard.destination ? dataCard.destination.split(',')[2] : 'Đang cập nhật'}
          </span>
        </div>
        <div className="content-component">
          {dataCard.name ? dataCard.name : "Đang cập nhật . . ."}
        </div>
        <div className="chedule-action">
          Lịch trình:  {dataCard.schedule}
        </div>
      </div>
      <div className="tour-action">
        <div className="left-action">{formatCurrency(dataCard.originalPrice * dataCard.discountPercentage / 100)} VNĐ</div>
        <div className="right-action">
          <button
            onClick={() => {
            CreateTour()
             }}
          >
            Đặt Ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default TourCard