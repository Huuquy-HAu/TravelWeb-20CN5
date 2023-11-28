const User = require("../models/User")
const { JWT_PASS } = process.env
var jwt = require('jsonwebtoken');

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
