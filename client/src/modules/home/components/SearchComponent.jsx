import React from 'react'
import { Input , Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SearchComponent() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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

                <button>
                    Tìm kiếm 
                </button>
            </div>
        </div>
    )
}

export default SearchComponent