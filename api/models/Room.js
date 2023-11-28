const mongoose = require("../config/mongoose");

const addressSchema = new mongoose.Schema({
    specificAddress: { type: String, required: true }, // Địa chỉ cụ thể
    city: { type: String, required: true }, // Tỉnh/Thành phố
    district: { type: String, required: true }, // Quận/Huyện
    ward: { type: String }, // Phường/Xã (có thể để trống nếu không áp dụng)
});

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    thumbnail: {
        type: String, 
        default: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/13034625/image-danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi-164709278437272.jpg'
    },
    images: [{ type: String }],
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            comment: String
        }
    ],
    currentRenter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } 
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
