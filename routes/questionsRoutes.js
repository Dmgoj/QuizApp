var express = require('express');
var router = express.Router();
var {show,answer} = require('../controllers/questionsController.js');
const {auth} = require('../middleware/auth')

/*
 * GET
 */
//router.get('/', questionsController.list);

/*
 * GET
 */

// Ova radi
//router.route('/').get(auth,show);

// Ova isto radi
router.get('/questions',auth, show)
//     console.log('Show route works!');
//   });
/*
 * POST
 */
router.post('/answer', answer);

/*
 * PUT
 */
//router.put('/:id', questionsController.update);

/*
 * DELETE
 */
//router.delete('/:id', questionsController.remove);

module.exports = router;
