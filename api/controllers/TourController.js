const Tours = require("../models/Tours")


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

