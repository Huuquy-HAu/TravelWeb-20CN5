const Tours = require("../models/Tours")
const fs = require('fs')
const path = require('path');
const multer = require('multer');


const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './publics/uploads/thumbnail');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


const imgTourStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './publics/uploads/img');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

exports.uploadAvatarTour = multer({
    storage: avatarStorage,
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.includes('image')) return cb(new Error('I don\'t have a clue!'))

        cb(null, true)
    }
})


exports.uploadTourImg = multer({
    storage: imgTourStorage,
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.includes('image')) return cb(new Error('I don\'t have a clue!'))

        cb(null, true)
    }
})




exports.getAllTours = async (req, res) => {
    try {
        // Giải mã các tham số truy vấn từ URL
        const { s, minprice, maxprice } = req.query;

        // Tạo điều kiện truy vấn dựa trên các tham số truy vấn
        const query = {};
        if (s) {
            // Nếu có tham số tìm kiếm theo tên
            query.name = { $regex: new RegExp(s, 'i') };
        }
        if (minprice || maxprice) {
            // Nếu có tham số giá
            query.originalPrice = {};
            if (minprice) query.originalPrice.$gte = parseInt(minprice);
            if (maxprice) query.originalPrice.$lte = parseInt(maxprice);
        }

        // Thực hiện truy vấn với điều kiện tìm kiếm
        const tours = await Tours.find(query);

        res.status(200).json({ status: 200, data: tours });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.CreateTour = async (req, res) => {
    try {
        // Kiểm tra xem có file avatar được tải lên không
        if (req.file) {
            req.body.thumbnail = req.file.path;
        }

        // Kiểm tra xem có files ảnh thumbs được tải lên không
        // if (req.files && req.files.length) {
        //     req.body.images = req.files
        //         .map((file) => file.path);
        // }

        // Tạo mới sản phẩm
        const tours = await Tours.create(req.body);

        res.status(200).json({ message: "Oke", status: 200, tours });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
exports.updateTour = async (req, res) => {
    try {
        const tourId = req.params.id; // Lấy ID của tour cần cập nhật từ URL
    
        // Kiểm tra xem có file avatar được tải lên không
        if (req.file) {
          req.body.thumbnail = req.file.path;
        }
    
        const updatedTour = await Tours.findByIdAndUpdate(tourId, req.body, {
          new: true, // Trả về tài liệu đã cập nhật
        });
    
        res.status(200).json({ message: "Cập nhật tour thành công", status: 200, updatedTour });
      } catch (error) {
        res.status(400).json({ message: "Cập nhật tour không thành công", error }); // Sử dụng mã lỗi 400 cho lỗi cập nhật
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

exports.changeStatusTour = async (req, res) => {
    try {
        const { idStatus, active } = req.query
        if (idStatus && active) {
            const tours = await Tours.updateOne({ _id: idStatus }, { active: active })
            return res.status(200).json({ status: 200, data: tours });
        }
        res.status(500).json({ message: "Invalite id , active" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}