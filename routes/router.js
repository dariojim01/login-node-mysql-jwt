const express = require('express');

const router = express.Router();

const autocontroller = require('../controllers/authController');

router.get('/', (req, res)=>{
    res.render('index');
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

module.exports = router;