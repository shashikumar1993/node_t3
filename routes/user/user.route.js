const express = require('express');
const userController = require('../../controllers/user.controller');
const user = require('../../middleware/user');
const router = express.Router();

router.post('/signup',user.validateSignup,userController.signup);
router.post('/login',user.validateLogin,userController.login);

// router.post('/signup',async (req,res) => {
//     res.send(req.body);
// })

module.exports = router;