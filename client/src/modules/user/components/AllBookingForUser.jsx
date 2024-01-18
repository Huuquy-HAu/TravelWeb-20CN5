import React, { useEffect, useState } from 'react'
import { Select, Table, message } from 'antd';
import { BASE_URL, getAPI, patchAPI } from '../../../config/api';
import '../scss/changePassword.scss';

function AllBookingForUser() {
    const [listData, setListData] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);

    const formatCurrency = (amount) => {
        // Chuyển đổi số thành chuỗi và tách phần nguyên và phần thập phân (nếu có)
        const [integerPart, decimalPart] = amount.toString().split('.');

        // Định dạng phần nguyên bằng cách thêm dấu phân cách mỗi ba số 0
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Kết hợp phần nguyên đã định dạng và phần thập phân (nếu có)
        const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

        return formattedAmount;
    }

    const getAllBookingForUser = async (req, res) => {
        try {
            const res = await getAPI('/api/booking/user');
            console.log(res);
            const newData = []
            res?.data.data.map((value, index) => {
                newData.push(
                    {
                        _id: value._id,
                        name: value.idTour.name,
                        address: value.idTour.destination,
                        price: formatCurrency(value.idTour.originalPrice * value.idTour.discountPercentage == 0 ? 1 : (value.idTour.discountPercentage / 100)),
                        schedule: value.idTour.schedule,
                        idTour: value.idTour._id,
                        idUser:value.idUser._id,
                        userName: value.idUser.username,
                        phoneNumber: value.idUser.phoneNumber,
                        isApproved: value.isApproved
                    }
                )
            })
            setListData(newData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getAllBookingForUser()
    }, [count])

    const columns = [
        {
            title: 'Tên chuyến du lịch',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Lịch trình',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Người dùng',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Trạng thái ',
            dataIndex: 'isApproved',
            key: '_id',
            render:(record, index) => {
                const handleChange = async (value) => {
                  console.log(76, value);
                  console.log(record , index.isApproved);
                  try {
                    const res = await patchAPI(BASE_URL + 'api/booking/' + index._id , 
                      {
                        idUser: index.idUser,
                        statusBooking:value,
                        idTour: index.idTour
                      })
                    console.log(res);
                    if (res?.data.status == 200) {
                      setCount(count + 1)
                      message.open({
                        type: "success",
                        content: "Đổi status thành công",
                        style: {
                          marginTop: '40px'
                        }
                      })
                    }
  
                  } catch (error) {
                    console.log(error);
                    message.error(error?.respose?.data.message)
                  }
                };
                return (
                  <span>
                    <Select
                      value={record}
                      style={{
                        width: 120,
                      }}
                      disabled={record == 0 || record == 2}
                      onChange={handleChange}
                      options={[
                        {
                          value: 0,
                          label: 'Huỷ chuyến đi'
                        },
                        {
                          value: 1,
                          label: 'Đang chờ duyệt'
                        },
                        {
                            value: 2,
                            label: 'Đã duyệt'
                        }
                      ]}
                    />
                  </span>
                )
              }}
        ,
    ];

    return (
        <div className='all-booking-page-for-user'>
            <h1>
                Tất cả booking của bạn
            </h1>

            <div className="all-booking-table">
                <Table columns={columns} dataSource={listData} />
            </div>


        </div>
    )
}

export default AllBookingForUser