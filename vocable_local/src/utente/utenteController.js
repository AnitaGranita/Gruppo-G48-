const { response } = require("express");
var utenteService = require("./utenteServices");
const authenticateToken = require('./authenticateToken'); // Importa il middleware

var createUtenteControllerFn = async (req, res) => {
    try {
        console.log("\nregistration");
        console.log(req.body);
        var status = await utenteService.createUtenteDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Utente creato con successo" }); 
        } else {
            res.send({ "status": false, "message": "Errore: Impossibile creare l'utente"});
        }
    } catch(err) {
        console.log(err);
    }
}

var loginUtenteControllerFn = async (req, res) => {
    var result = null;
    console.log("\nlogin");
    console.log(req.body);
    try {
        result = await utenteService.loginUtenteDBService(req.body);
        if(result.status){
            console.log("true");
            res.send({ "status":true, "message":result.msg, "token":result.token, "id":result.id });
        } else {
            console.log("false");
            res.send({ "status":false, "message":result.msg });
        }
    } catch(errore) {
        console.log(errore);
        res.send({"status":false,"message":errore.msg});
    }
}

var meUtenteControllerFn = async (req, res) => {
    try {
        // Trova l'utente nel database utilizzando l'email memorizzata nel token
        const user = await utenteService.findUserByEmail(req.user.email);

        if (!user) {
            return res.status(404).json({ msg: 'Utente non trovato' });
        }

        // Restituisci i dettagli dell'utente
        res.json({
            email: user.email,
            nickname: user.nickname,
            id: user._id
        });
    } catch (error) {
        res.status(500).json({ msg: 'Errore del server' });
    }
}

module.exports = { createUtenteControllerFn, loginUtenteControllerFn, meUtenteControllerFn };
