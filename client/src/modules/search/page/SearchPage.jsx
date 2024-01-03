import React, { useEffect, useState } from 'react'
import '../scss/SearchPage.scss'
import SearchComponent from '../../home/components/SearchComponent'
import { BASE_URL, getAPI } from '../../../config/api'
import TourCard from '../../tour/component/TourCard'
import { useLocation } from 'react-router'

function SearchPage() {

    const [listData, setListData] = useState([])
    const [count, setCount] = useState(0)
    const location = useLocation();
    const link = new URLSearchParams(location.search);


    const getAllTour = async (req, res) => {
        try {
            const search = link.get('s')
            const minprice = link.get('minprice')
            const maxprice  = link.get('maxprice')

            const queryString = `?s=${search || ''}&minprice=${minprice || ''}&maxprice=${maxprice || ''}`;

            // Gọi API với query string
            const res = await getAPI(`/api/tour${queryString}`);

            // Giải mã các tham số truy vấn từ URL
            console.log(search, maxprice , minprice);
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
    }, [location])


    return (
        <div className='search-page-container'>
            <div className="search-page-header">
                <SearchComponent />
            </div>
            <div className="search-page-content">
                {
                    listData?.map((value) => {
                        if (value.active == 'show') {
                            return (
                                <TourCard dataCard={value} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SearchPage