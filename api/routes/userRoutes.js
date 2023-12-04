const { signIn, signUp, getInforOneUser, getAllUserOrGetOne, changePassword, changeUserInfor, changeAvatar, upload } = require("../controllers/UserController");
const { checkLogin, CheckAdmin } = require("../middlewares/User");
const router = require('express').Router();


router.post('/api/sign-up', signUp);
router.post('/api/sign-in', signIn);
router.get('/api/user', checkLogin, getInforOneUser)
router.post('/api/user', checkLogin, changeUserInfor)
router.get('/api/user/:id', CheckAdmin, getAllUserOrGetOne)
router.post('/api/user/change-password', checkLogin, changePassword)
router.patch('/api/user/avatar', checkLogin ,upload.single('avatar'), changeAvatar)


module.exports = router
  