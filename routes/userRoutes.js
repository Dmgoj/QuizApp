var express = require('express');
var router = express.Router();
var {test,profile,register,login,update,remove} = require('../controllers/userController.js');
const {auth} = require('../middleware/auth')

/**
 * get routes
 */
router.get('/login',test);


/*
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
//router.route('/',auth).get(profile).put(update).delete(remove)





module.exports = router;
