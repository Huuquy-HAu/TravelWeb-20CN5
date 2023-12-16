const Booking = require("../models/Booking")
const { JWT_PASS } = process.env
const jwt = require('jsonwebtoken');
const fs = require('fs')
exports.getBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.role !== 2) {
            const userBookings = await Booking.find({ idUser: userId });
            return res.status(200).json({ message: 'User bookings retrieved successfully', bookings: userBookings });
        }
        const allBookings = await Booking.find();
        res.status(200).json({ message: 'All bookings retrieved successfully', bookings: allBookings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.newBooking  = async (req, res) => {
    try {
        const { tourId, price ,startDate } = req.body;
        const userId = req.user._id;
        const existingBooking = await Booking.findOne({
            idTour: tourId,
            idUser: userId,
            startDate: startDate,
        });

        if (existingBooking) {
            return res.status(400).json({ message: "User already booked this tour" });
        }
        const newBooking = await Booking.create({
            idTour: tourId,
            idUser: userId,
            price: price,
            startDate: startDate,
            isApproved: 1,
        });
        res.status(200).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
exports.ApproveBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const existingBooking = await Booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (existingBooking.isApproved !== 1) {
            return res.status(400).json({ message: 'Booking is not pending approval' });
        }
        if (req.user.role !== 2) {
            return res.status(403).json({ message: 'Unauthorized. Only admins can approve bookings' });
        }

        await bookingId.findByIdAndUpdate(bookingId, { isApproved: 2 });

        res.status(200).json({ message: 'Booking approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user || user.role !== 2) {
            return res.status(403).json({ message: "Permission denied" });
        }
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        if (booking.isApproved === 1) {z
            await Booking.findByIdAndUpdate(bookingId, { isApproved: 0 });// Nếu booking ở trạng thái chờ xét duyệt, có thể xóa 
            res.status(200).json({ message: "Booking canceled successfully" });
        } else if (booking.isApproved === 2) {
            if (user.role === 1) {
                return res.status(403).json({ message: "Permission denied" });// Nếu là user bình thường, không thể xóa
            } else if (user.role === 2) {
                await Booking.findByIdAndUpdate(bookingId, { isApproved: 0 });// Nếu là admin, có thể xóa
                res.status(200).json({ message: "Booking marked as deleted by admin" });
            }
        } else {
            res.status(400).json({ message: "Invalid action for booking in current state" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}