const { CreateTour, getAllTours, updateTour, deleteTour, uploadAvatarTour, uploadTourImg } = require("../controllers/TourController");
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();

router.post('/', checkLogin, CheckAdmin, uploadAvatarTour.single('thumbnail') , CreateTour);
router.get('/', checkLogin, getAllTours);
router.patch('/:id',checkLogin, CheckAdmin, updateTour);
router.delete('/:id',checkLogin, CheckAdmin , deleteTour);

module.exports = router



