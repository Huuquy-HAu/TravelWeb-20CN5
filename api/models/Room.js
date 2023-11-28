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
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
