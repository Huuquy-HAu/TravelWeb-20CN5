const User = require("../models/User")
const { JWT_PASS } = process.env
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './publics/uploads/avatar');
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

exports.signUp = async (req, res) => {
    try {
        const checkUserName = await User.findOne({ username: req.body.username });
        if (checkUserName) return res.status(400).json({ message: 'username is in used' });

        const checkGmail = await User.findOne({ gmail: req.body.gmail });
        if (checkGmail) return res.status(400).json({ message: 'Gmail is in used' });

        const user = await User.create({ ...req.body });

        res.status(200).json({ message: 'create account success', user })
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

exports.signIn = async (req, res) => {
    try {
        const checkAccount = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!checkAccount) return res.status(400).json({ message: 'wrong account' });

        delete checkAccount._doc.password;
        const token = jwt.sign(checkAccount._doc, JWT_PASS);
        delete checkAccount._doc.notifications;
        checkAccount._doc.token = token

        res.status(200).json({ message: 'login success', checkAccount })
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

exports.getInforOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select(['-password']);
        res.status(200).json({ status: 200, data: user })
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

exports.getAllUserOrGetOne = async (req, res) => {
    try {

        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Not id !!" })

        if (id == 0) {
            const user = await User.find();
            return res.status(200).json({ status: 200, data: user })
        } else {
            const user = await User.findOne({ _id: id }).select(['-password']);
            return res.status(200).json({ status: 200, data: user })
        }
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const password = req.body.password;

        if (!password) return res.status(400).json({ message: "Requied Password" })

        const user = await User.findByIdAndUpdate(req.user._id, { password: password })

        if (!user) return res.status(400).json({ message: "Change password error" })

        return res.status(200).json({ status: 200, message: "Change password suscces" })
    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

exports.changeUserInfor = async (req, res) => {
    try {
        const { address, phoneNumber, gender, description } = req.body

        const user = await User.findByIdAndUpdate(req.user._id, { address, phoneNumber, gender, description })
        res.status(200).json({ status: 200, data: user })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "error server ", error })
    }
}

exports.changeAvatar = async (req, res) => {
    console.log(req.file);
    try {
        if(!req.file) return res.status(400).json({message: 'please choose an avatar'});
        
        const user = await User.findOne({_id: req.user._id});

        if(!user.avatar.startsWith('http')){
            fs.unlink(user.avatar, () => {return})
        }

        await User.updateOne({_id: req.user._id}, {avatar: req.file.path});
        res.status(200).json({message: 'change avatar ok'})
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}
rts.newBooking  = async (req, res) => {
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
        if (booking.isApproved === 1) {
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
