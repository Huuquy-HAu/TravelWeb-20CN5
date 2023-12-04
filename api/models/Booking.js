const mongoose = require("../config/mongoose");


const bookingSchema = new mongoose.Schema({
    idTour: {
        type: Schema.Types.ObjectId, 
        ref: 'Tour', 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    idUser: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    isApproved: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    } // 0: Bị hủy, 1: Chờ duyệt, 2: Duyệt thành công
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;