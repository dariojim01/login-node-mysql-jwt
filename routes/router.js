const express = require('express');

const router = express.Router();

const autocontroller = require('../controllers/authController');

router.get('/', autocontroller.isAuthenticated, (req, res)=>{
    res.render('index', {
        user: req.user
    });
});

router.get('/login', (req, res)=>{
    res.render('login', {
        alert: false
    });
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.post('/register', autocontroller.register);
router.post('/login', autocontroller.login);
router.get('/logout', autocontroller.logout);


module.exports = router;