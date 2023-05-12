var express = require('express');
var router = express.Router();
var {profile,register,login,update,remove} = require('../controllers/userController.js');
const auth = require('../middleware/auth')





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
router.route('/:id',auth).get(profile).put(update).delete(remove)





module.exports = router;
