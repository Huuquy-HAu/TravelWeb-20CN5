const { getAllBooking, getBookingForUser, newBooking, ApproveBooking } = require("../controllers/BookingController");
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();


router.get('/api/booking', checkLogin, CheckAdmin , getAllBooking);
router.get('/api/booking/:idUser', checkLogin , getBookingForUser);
router.post('/api/booking', checkLogin , CheckAdmin , newBooking);
router.patch('/api/booking/:idBooking', checkLogin, ApproveBooking);