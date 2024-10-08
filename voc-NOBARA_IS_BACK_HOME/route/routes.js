var express = require('express');
var utenteController = require('../src/utente/utenteController.js');
var utentestatsController = require('../src/utente/utentestatsController.js');
const authenticateToken = require('../src/utente/authenticateToken'); // Importa il middleware
var resetPasswordController = require('../src/utente/resetPasswordController.js');

const router = express.Router();

router.route('/utente/login').post(utenteController.loginUtenteControllerFn);
router.route('/utente/create').post(utenteController.createUtenteControllerFn);
router.route('/utente/createstats').post(utentestatsController.createUtentestatsControllerFn);
router.route('/utente/me').get(authenticateToken, utenteController.meUtenteControllerFn); 
router.route('/utente/logout').post(authenticateToken, utenteController.logoutUtenteControllerFn);

router.route('/utente/new-api').post(utenteController.newApiControllerFn);
router.route('/utente/send-reset-link').post(utenteController.sendResetLink); //con questo mando la mail



router.post('utente/reset-password/:token', resetPasswordController.sendResetEmail);





router.route('/utente/send-test-email').post(utenteController.sendTestEmailControllerFn); // Nuova route per inviare email


module.exports = router; 
