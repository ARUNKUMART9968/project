const { signup, login } = require('../controllers/Auth-controller');
const { signupValidation, loginValidation } = require('../Middlewares/Authvalidation');
const { submitComplaint, getComplaints } = require('../controllers/complaint-contoller');
const { complaintValidation } = require('../Middlewares/complaintvalidation');

const router = require('express').Router();
router.post('/signup', signupValidation, signup)
router.put('/login', loginValidation, login)
router.put('/complaintform', complaintValidation, submitComplaint)
router.get('/complaints',getComplaints)
module.exports = router;