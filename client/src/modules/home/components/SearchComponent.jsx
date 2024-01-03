import React, { useState } from 'react'
import { Input , Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

function SearchComponent() {
    const [inputValue , setInputValue] = useState()
    const [selectValue , setSelectValue] = useState()
    const nav = useNavigate()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectValue(value)
    };
    

    return (
        <div className='SearchComponent'>
            <div className="header">
                <h1>
                    Bạn lựa chọn chuyến du lịch nào ?
                </h1>
            </div>
            <div className="description">
                Hơn 100 Tour du lịch giá tốt đang chờ bạn
            </div>
            <div className="form">
                <Input
                    size="large"
                    style={{
                        width: 250,
                        margin: "0 10px"
                    }}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    placeholder="Nhập tên tour Du lịch"
                    prefix={<SearchOutlined />}
                />

                <Select
                    defaultValue="Tất cả mức giá"
                    placeholder="Select a person"
                    style={{
                        width: 200,
                        margin: "0 10px"
                    }}
                    
                    size='large'
                    onChange={handleChange}
                    options={[
                        {
                            value: 1,
                            label: 'Tất cả mức giá',
                        },
                        {
                            value: 2,
                            label: 'Từ 1 đến 3 triệu',
                        },
                        {
                            value: 3,
                            label: 'Từ 3 đến 6 triệu',
                        },
                        {
                            value: 4,
                            label: 'Trên 6 triệu',
                        }
                    ]}
                />

                <button
                    onClick={() => {
                        console.log(inputValue, selectValue);

                        const query = {}
                        if(inputValue) {
                            query.s = inputValue
                        }
                        if(selectValue == 2 ){
                            query.minprice = 1000000
                            query.maxprice = 3000000
                        }

                        if(selectValue == 3 ){
                            query.minprice = 3000000
                            query.maxprice = 6000000
                        }

                        if(selectValue == 4 ){
                            query.maxprice = 6000000
                        }

                        if(query) {
                           return nav('/search?'+ (query.s ? 's='+query.s : '') + (query.minprice ? (query.s ? '&minprice='+query.minprice :'minprice='+query.minprice): '') + (query.maxprice ? (query.s ? '&maxprice='+query.maxprice : (query.minprice ? '&maxprice='+query.maxprice :'maxprice='+query.maxprice)): ''))
                        }
                        return nav('/search')
                    }}
                    >
                    Tìm kiếm 
                </button>
            </div>
        </div>
    )
}

export default SearchComponent