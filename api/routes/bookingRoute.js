const { getAllBooking, getBookingForUser, newBooking, ApproveBooking } = require("../controllers/BookingController");
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();


router.get('/', checkLogin, CheckAdmin , getAllBooking);
router.get('/user', checkLogin , getBookingForUser);
router.post('/', checkLogin , CheckAdmin , newBooking);
router.patch('/:idBooking', checkLogin, ApproveBooking);


module.exports = router
