import React, { useEffect } from 'react'
import { Select, Space } from 'antd';
import { useState } from 'react';
import axios from 'axios';



function District({ form }) {
    const Base_URL ='https://provinces.open-api.vn/api/'
    const [cities, setCities] = useState([]);
    const [Quan, setQuan] = useState([]);
    const [Xa, setXa] = useState([])
    const [selectedQuan, setSelectedQuan] = useState()
    const [selectedXa, setSelectedXa] = useState()
    const [selectedCity, setSelectedCity] = useState()

    const getCity= async () => {
        try {
            const {data} = await axios.get(Base_URL)
            setCities(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
      getCity()
    }, [])
    
    const findNameById = (id, data) => {
        const foundItem = data.find(item => item.code === id);
        return foundItem ? foundItem.name+'' : null;
    };

    const handleProvinceChange = async (value) => {
        try {
            setSelectedQuan('Chọn Quận -Huyện')
            setSelectedXa('Chọn Xã- Phường')
            setSelectedCity(value)
            const {data} = await axios.get(Base_URL+`p/${value}?depth=2`)
            setQuan(data?.districts)
        } catch (error) {
            console.log(error);
        }
    };
    const onSecondCityChange = async (value) => {
        try {
            setSelectedQuan(value)
            setSelectedXa('Chọn Xã- Phường')
            const {data} = await axios.get(Base_URL+`d/${value}?depth=2`)
            setXa(data?.wards)
        } catch (error) {
            console.log(error);
        }
    };

    const onThirdCityChange = async (value) => {
        try {
            setSelectedXa(value)
            form.setFieldsValue({ destination: `${findNameById(value, Xa)},${findNameById(selectedQuan, Quan)},${findNameById(selectedCity, cities)}` });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Space wrap>
                <Select
                    placeholder='Chọn thành phố - Tỉnh'
                    style={{
                        width: 200,
                    }}
                    onChange={handleProvinceChange}
                    options={cities.map((province) => ({
                        label: province.name,
                        value: province.code,
                    }))}
                />
                <Select
                    placeholder='Chọn Quận -Huyện'
                    style={{
                        width: 200,
                    }}
                    value={selectedQuan}
                    onChange={onSecondCityChange}
                    options={Quan.map((city) => ({
                        label: city.name,
                        value: city.code,
                    }))}
                />
                <Select
                    placeholder='Chọn Xã- Phường'
                    style={{
                        width: 200,
                    }}
                    value={selectedXa}
                    onChange={onThirdCityChange}
                    options={Xa.map((city) => ({
                        label: city.name,
                        value: city.code,
                    }))}
                />
            </Space>
        </div>
    )
}

export default District