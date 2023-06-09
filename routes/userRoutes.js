var express = require('express');
var router = express.Router();
var {test,profile,register,login,update,remove} = require('../controllers/userController.js');
const {auth} = require('../middleware/auth')

/**
 * GET
 */
router.get('/login',test);
router.get('/', auth, profile);


/*
 * POST
 * Register user
 */
router.post('/register',register)

/*
 * Login user
 */
router.post('/login', login);

/*
 * PUT, DELETE 
 */

router.get('/', auth, profile);






module.exports = router;
