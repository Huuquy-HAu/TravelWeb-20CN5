const { signIn , signUp} = require("../controllers/UserController")
const router = require('express').Router();


router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

module.exports = router
