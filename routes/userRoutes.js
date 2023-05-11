var express = require('express');
var router = express.Router();
var {register,login,update,remove} = require('../controllers/userController.js');



/*
 * Register user
 */
router.post('/',register)

/*
 * Login user
 */
router.post('/login', login);



/*
 * PUT, DELETE 
 */
router.route('/:id').put(update).delete(remove)



module.exports = router;
