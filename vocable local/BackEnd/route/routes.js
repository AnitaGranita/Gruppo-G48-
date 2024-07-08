var express = require('express');

var utenteController = require('../src/utente/utenteController.js');
const router = express.Router();

router.route('/utente/login').post(utenteController.loginUtenteControllerFn);
router.route('/utente/create').post(utenteController.createUtenteControllerFn);


module.exports = router;