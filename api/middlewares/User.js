const jwt = require('jsonwebtoken');
const { JWT_PASS } = process.env
const User = require("../models/User")

exports.checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: 'not loged in' });

        const user = jwt.verify(token, JWT_PASS);
        const checkToken = await User.findOne({ _id: user._id });

        if (!checkToken) return res.status(400).json({ message: 'invalid token' });

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}

exports.CheckAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: 'not loged in' });
        
        const user = jwt.verify(token, JWT_PASS);
        const checkRoleAdmin = await User.findOne({ _id: user._id });
        
        if (!checkRoleAdmin) return res.status(400).json({ message: 'invalid token' });
        if (checkRoleAdmin?.role == 2) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: 'Not admin' });
        }


    } catch (error) {
        res.status(500).json({ message: 'server error', error })
    }
}
