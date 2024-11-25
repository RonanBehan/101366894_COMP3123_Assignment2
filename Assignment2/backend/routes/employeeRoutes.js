const express = require('express');
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
const { check } = require('express-validator');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/employees', verifyToken, getAllEmployees);
router.post('/employees', verifyToken, [
    check('first_name').notEmpty().withMessage('First name is required'),
    check('last_name').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('position').notEmpty().withMessage('Position is required'),
    check('salary').isNumeric().withMessage('Salary must be a number'),
    check('date_of_joining').isDate().withMessage('Invalid date'),
    check('department').notEmpty().withMessage('Department is required'),
], createEmployee);

router.get('/employees/:eid', verifyToken, getEmployeeById);
router.put('/employees/:eid', verifyToken, updateEmployee);
router.delete('/employees', verifyToken, deleteEmployee);

module.exports = router;
