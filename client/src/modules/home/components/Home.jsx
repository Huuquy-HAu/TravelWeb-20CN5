import React, { useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import TourCard from '../../tour/component/TourCard'
import { BASE_URL, getAPI } from '../../../config/api';

function Home() {

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [listData, setListData] = useState([])
    const [count , setCount] =useState(0)


    const getAllTour = async (req, res) => {
        try {
            const res = await getAPI('/api/tour');
            console.log(res);
            const newData = []
            res?.data.data.map((value, index) => {
                newData.push(
                    {
                        _id: value._id,
                        name: value.name,
                        destination: value.destination,
                        originalPrice: value.originalPrice,
                        discountPercentage: value.discountPercentage,
                        schedule: value.schedule,
                        active: value.active,
                        thumbnail: value.thumbnail.startsWith('https') ? value.thumbnail : BASE_URL + value.thumbnail
                    }
                )
            })
            setListData(newData)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllTour()
    }, [count])




    return (
        <div className='Home-container'>
            <div className="banner">
                <video
                    class="home-video"
                    src="https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.mp4"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                />
                <SearchComponent />
            </div>
            <div className="tour-content">
                <div className="header">
                    <div className="header-left">
                        <h4>
                            Tour Du lịch mới và phổ biến nhẩt
                        </h4>
                    </div>
                    <div className="header-right">
                        <p>
                            Với Travel Project, bạn có thể lựa chọn những tour du lịch
                            phù hợp với sở thích và ngân sách của mình.
                            Từ những tour du lịch ngắn ngày đến những tour du lịch dài ngày,
                            từ những tour du lịch khám phá đến những tour du lịch nghỉ dưỡng,
                            chúng tôi đáp ứng mọi nhu cầu của bạn.
                        </p>
                    </div>
                </div>
                <div className="nav-tour">
                    {
                        listData?.map((value) => {
                            if(value.active == 'show'){
                                return (
                                    <TourCard dataCard={value} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home