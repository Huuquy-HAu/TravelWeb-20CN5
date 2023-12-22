const Tours = require("../models/Tours")
const { JWT_PASS } = process.env
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './publics/uploads/tours');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

exports.upload = multer({ storage: storage , 
    fileFilter: function(req, file, cb){
        if(!file.mimetype.includes('image')) return cb(new Error('I don\'t have a clue!'))

        cb(null, true)
}})
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tours.find();
        res.status(200).json({ status: 200, data: tours });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.CreateTour = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user || user.role !== 2) {
            return res.status(403).json({ message: "Permission denied" });
        }

        const { name, thumbnail, originalPrice, discountPercentage, images, destination, active, schedule } = req.body;
        const newTour = await Tours.create({
            name,
            thumbnail,
            originalPrice,
            discountPercentage,
            images,
            destination,
            active,
            schedule
        });

        res.status(200).json({ message: "Tour created successfully", tour: newTour });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
exports.updateTour = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user || user.role !== 2) {
            return res.status(403).json({ message: "Permission denied" });
        }

        const { tourId, name, thumbnail, originalPrice, discountPercentage, images, destination, active, schedule } = req.body;
        const existingTour = await Tours.findById(tourId);
        if (!existingTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        existingTour.name = name || existingTour.name;
        existingTour.thumbnail = thumbnail || existingTour.thumbnail;
        existingTour.originalPrice = originalPrice || existingTour.originalPrice;
        existingTour.discountPercentage = discountPercentage || existingTour.discountPercentage;
        existingTour.images = images || existingTour.images;
        existingTour.destination = destination || existingTour.destination;
        existingTour.active = active || existingTour.active;
        existingTour.schedule = schedule || existingTour.schedule;

        await existingTour.save();

        res.status(200).json({ message: "Tour updated successfully", tour: existingTour });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
exports.deleteTour = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user || user.role !== 2) {
            return res.status(403).json({ message: "Permission denied" });
        }

        const tourId = req.params.tourId;

        const existingTour = await Tours.findById(tourId);
        if (!existingTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        await existingTour.remove();

        res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
exports.changeThumbnail =  async (req, res) => {
    try {
        const tourId = req.body.tourId;
        const existingTour = await Tours.findById(tourId);
        const oldThumbnailPath = existingTour.thumbnail;
        if (!existingTour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        // Nếu có ảnh thumbnail cũ, xóa nó
        if (existingTour.thumbnail) {
            await fs.unlink(oldThumbnailPath);
            existingTour.thumbnail = req.file.path;
            await existingTour.save();

            res.status(200).json({ message: "Thumbnail updated successfully", tour: existingTour });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
