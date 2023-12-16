const Comment = require("../models/Comment");
const Tour = require("../models/Tours");
const Booking = require("../models/Booking");
exports.getAllComments = async (req , res) => {
    try{
        const comments = await Comment.find();
        res.status(200).json({ status: 200 , data: comments});

    }catch (error){
        res.status(500).json({message: 'Server error', error });
    }
}
exports.getCommentsByTour = async (req, res) => {
    try {
        const { tourId } = req.params;
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        const comments = await Comment.find({ tourId });
        res.status(200).json({ status: 200, data: comments });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.postComment = async (req, res) => {
    try {
        const { tourId, content, rating } = req.body;
        const userId = req.user._id;
        const booking = await Booking.findOne({ idTour: tourId, idUser: userId, isApproved: 2 });
        if (!booking) {
            return res.status(403).json({ message: 'User has not booked this tour or the booking is not approved' });
        }
        const newComment = await Comment.create({
            userId,
            tourId,
            content,
            rating,
        });
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}