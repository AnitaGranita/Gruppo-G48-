const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { response } = require("express");
var utenteService = require("./utenteServices");
const authenticateToken = require('./authenticateToken');
require('dotenv').config()



var createUtenteControllerFn = async (req, res) => {
    try {
        console.log("\nregistration");
        console.log(req.body);
        var status = await utenteService.createUtenteDBService(req.body);
        console.log(status);

        if (status && status.status === true) {
            res.send({ "status": true, "message": "Utente creato con successo" });
        } else {
            res.send({ "status": false, "message": status.msg || "Errore: Impossibile creare l'utente" });
        }
    } catch (err) {
        console.log(err);
        res.send({ "status": false, "message": "Errore: Impossibile completare la richiesta" });
    }
}


var loginUtenteControllerFn = async (req, res) => {
    var result = null;
    console.log("\nlogin");
    console.log(req.body);
    try {
        result = await utenteService.loginUtenteDBService(req.body);
        if (result.status) {
            console.log("true");
            res.send({ "status": true, "message": result.msg, "token": result.token, "id": result.id });
        } else {
            console.log("false");
            res.send({ "status": false, "message": result.msg });
        }
    } catch (errore) {
        console.log(errore);
        res.send({ "status": false, "message": errore.msg });
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

var logoutUtenteControllerFn = async (req, res) => {
    try {
        res.status(200).send({
            status: true,
            message: "Logout avvenuto con successo"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Errore durante il logout"
        });
    }
}



const newApiControllerFn = async (req, res) => {
    try {
        const { name } = req.body; // Estrai il nome dal corpo della richiesta

        if (!name) {
            return res.status(400).json({ message: "Nome non fornito" });
        }

        // Rispondi con un messaggio personalizzato
        res.status(200).json({ message: `Ciao ${name}!` });
    } catch (error) {
        res.status(500).json({ message: "Errore del server" });
    }
}

const sendResetLink = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email non fornita" });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ADDR,
                pass: process.env.EMAIL_PASS
            }
        });

        const payload = { email };
        const options = { expiresIn: '1h' };
        const token = jwt.sign(payload, process.env.JWT_RESET_PASSWORD, options);

        console.log('Token: ', token);
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        console.log('Reset link:', resetLink);

        // Configura il contenuto dell'email
        const mailOptions = {
            from: process.env.EMAIL_ADDR,
            to: email,
            subject: 'Reset Password',
            html: `
                <h2>Per favore, clicca sul seguente link per resettare la tua password:</h2>
            `
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email di reset password inviata con successo" });
        
    } catch (error) {
        res.status(500).json({ message: "Errore del server" });
    }
}




const sendTestEmailControllerFn = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email non fornita' });
        }

        // Configura il trasportatore di Nodemailer con l'opzione tls per disabilitare la verifica del certificato
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ADDR,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // Disabilita la verifica del certificato
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDR,
            to: email,
            subject: 'Prova di invio email',
            text: 'Ciao, questa è una prova di invio email!'
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email inviata con successo!' });
    } catch (error) {
        console.error("Errore durante l'invio dell'email:", error);
        res.status(500).json({ message: 'Errore del server' });
    }
};




module.exports = {
    createUtenteControllerFn,
    loginUtenteControllerFn,
    meUtenteControllerFn,
    logoutUtenteControllerFn,
    newApiControllerFn,
    sendResetLink,
    sendTestEmailControllerFn 
};

