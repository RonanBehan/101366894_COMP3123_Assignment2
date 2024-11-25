const express = require('express');
const { signup, login } = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/signup', [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], signup);

router.post('/login', [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required'),
], login);

module.exports = router;
