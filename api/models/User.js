const mongoose = require("../config/mongoose");

const notificationSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    }, // 0: banned, 1: user, 2: admin
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKXlHcXDayAbEYhChA9wXevrRqSvkH3fIbow&usqp=CAU'
    },
    address: String,
    phoneNumber: String,
    active: {
        type: Boolean,
        default: false
    }, // 0: inactive, 1: active
    notifications: [notificationSchema]
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
