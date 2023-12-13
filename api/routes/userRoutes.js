const { signIn, signUp, getInforOneUser, getAllUserOrGetOne, changePassword, changeUserInfor, changeAvatar, upload } = require("../controllers/UserController");
const { getBookings ,newBooking,ApproveBooking,cancelBooking } = require("../controllers/BookingController")
const { getAllTours ,CreateTour, updateTour,deleteTour } = require("../controllers/TourController")
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();

router.post('/api/sign-up', signUp);
router.post('/api/sign-in', signIn);
router.get('/api/user', checkLogin, getInforOneUser)
router.post('/api/user', checkLogin, changeUserInfor)
router.get('/api/user/:id', CheckAdmin, getAllUserOrGetOne)
router.post('/api/user/change-password', checkLogin, changePassword)
router.patch('/api/user/avatar', checkLogin ,upload.single('avatar'), changeAvatar)
router.patch('/api/booking',checkLogin, newBooking)
router.patch('/api/booking',checkLogin, CheckAdmin, ApproveBooking)
router.patch('/api/booking',checkLogin, cancelBooking)
router.get('/api/tours',checkLogin, getAllTours)
router.post('/api/tours/custom',checkLogin,CheckAdmin,CreateTour)
router.patch('/api/tours/custom',checkLogin,CheckAdmin,updateTour)
router.delete('/api/tours/custom',checkLogin,CheckAdmin,deleteTour)
module.exports = router
  