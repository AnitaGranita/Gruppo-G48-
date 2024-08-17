const express = require('express');
const router = express.Router();
const { loginUtenteDBService } = require('../utente/utenteServices'); // Importa la funzione di login

router.post('/login', async (req, res) => {
    try {
        const result = await loginUtenteDBService(req.body);
        console.log('Login Result:', result); // Log della risposta del servizio
        res.json(result); // Invia la risposta JSON al client
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: false, msg: "Errore durante il login" });
    }
});

module.exports = router;
