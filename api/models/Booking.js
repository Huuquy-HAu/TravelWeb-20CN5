const mongoose = require("../config/mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const bookingSchema = new mongoose.Schema({
    idTour: {
        type: ObjectId, 
        ref: 'tours', 
        required: true
    },
    price: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: String, 
        required: true 
    },
    idUser: { 
        type: ObjectId, 
        ref: 'users', 
        required: true 
    },
    isApproved: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    } // 0: Bị hủy, 1: Chờ duyệt, 2: Duyệt thành công
});


const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;