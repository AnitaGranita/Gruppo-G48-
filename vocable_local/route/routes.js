var express = require('express');
var utenteController = require('../src/utente/utenteController.js');
var utentestatsController = require('../src/utente/utentestatsController.js');
const authenticateToken = require('../src/utente/authenticateToken'); // Importa il middleware

const router = express.Router();

router.route('/utente/login').post(utenteController.loginUtenteControllerFn);
router.route('/utente/create').post(utenteController.createUtenteControllerFn);
router.route('/utente/createstats').post(utentestatsController.createUtentestatsControllerFn);
router.route('/utente/me').get(authenticateToken, utenteController.meUtenteControllerFn); 

module.exports = router;
