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

exports.upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.includes('image')) return cb(new Error('I don\'t have a clue!'))

        cb(null, true)
    }
})

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

        res.status(200).json({ message: 'login success', data: checkAccount })
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
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old password and new password are required" });
        }

        // Kiểm tra old password
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(oldPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Nếu old password đúng, thì cập nhật password mới
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ status: 200, message: "Change password success" });
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
        if (!req.file) return res.status(400).json({ message: 'please choose an avatar' });

        const user = await User.findOne({ _id: req.user._id });

        if (!user.avatar.startsWith('http')) {
            fs.unlink(user.avatar, () => { return })
        }

        await User.updateOne({ _id: req.user._id }, { avatar: req.file.path });
        res.status(200).json({ message: 'change avatar ok' })
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}
