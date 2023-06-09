var express = require('express');
var router = express.Router();
var {show,answer,final} = require('../controllers/questionsController.js');
const {auth} = require('../middleware/auth')

/*
 * GET
 */
router.get('/questions',auth, show);
router.get('/final',final);

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
