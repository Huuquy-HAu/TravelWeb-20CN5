const mongoose = require("../config/mongoose");


const tourSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    thumbnail: { 
        type: String,
        default: "https://static-images.vnncdn.net/files/publish/2022/7/8/trang-an-1382.jpg"
    }, // Đường dẫn của hình ảnh đại diện (thumbnail) cho tour
    originalPrice: { 
        type: Number, 
        required: true, 
        default: 0 
    }, // Giá gốc (mặc định là 0)
    discountPercentage: { 
        type: Number, 
        default: 0 
    }, // Phần trăm giảm giá (mặc định là 0)
    images: [
        { 
            type: String 
        }
    ], // Mảng chứa đường dẫn của hình ảnh liên quan đến tour
    destination: { 
        type: String, 
        required: true 
    }, // Địa điểm đến của tour
    active: { 
        type: String, 
        enum: ["hide", "show"],
        default: 'show'
    }, // Trạng thái hoạt động (mặc định là true)
    schedule: { 
        type: String, 
        required: true 
    }, // Lịch trình của tour
});

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;
