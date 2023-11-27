const User = require("../models/User")
const {JWT_PASS} = process.env
var jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    console.log(req.body);
    try {
        const checkDup = await User.findOne({username: req.body.username});
        if(checkDup) return res.status(400).json({message: 'username is in used'});

        const user = await User.create({...req.body});

        res.status(200).json({message: 'create account success' , user})
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}


exports.signIn = async (req, res) => {
    try {
        const checkAccount = await User.findOne({username: req.body.username , password: req.body.password});
        if(!checkAccount) return res.status(400).json({message: 'wrong account'});
        
        delete checkAccount._doc.password;
        const token = jwt.sign(checkAccount._doc, JWT_PASS);
        console.log(22,"oke");
        delete checkAccount._doc.notifications;
        checkAccount._doc.token = token

        res.status(200).json({message: 'login success', checkAccount})
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}


