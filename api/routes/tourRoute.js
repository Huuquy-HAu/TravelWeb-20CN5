const { CreateTour, getAllTours, updateTour, deleteTour, uploadAvatarTour, uploadTourImg, changeStatusTour } = require("../controllers/TourController");
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();

router.post('/', checkLogin, CheckAdmin, uploadAvatarTour.single('thumbnail') , CreateTour);
router.get('/', checkLogin, getAllTours);
router.patch('/active', checkLogin, CheckAdmin, changeStatusTour);
router.patch('/:id',checkLogin, CheckAdmin,uploadAvatarTour.single('thumbnail'), updateTour);
router.delete('/:id',checkLogin, CheckAdmin , deleteTour);

module.exports = router



