// resetPasswordController.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendResetEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica che l'email sia presente nel corpo della richiesta
        if (!email) {
            return res.status(400).json({ message: "Email non fornita" });
        }

        // Configura il trasmettitore di email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ADDR,
                pass: process.env.EMAIL_PASS
            }
        });

        // Crea il payload per il token di reset
        const payload = { email };
        const options = { expiresIn: '1h' }; // Imposta una scadenza per il token
        const token = jwt.sign(payload, process.env.JWT_RESET_PASSWORD, options);

        // Configura il contenuto dell'email
        const mailOptions = {
            from: process.env.EMAIL_ADDR,
            to: email,
            subject: 'Reset Password',
            html: `
                <h2>Per favore, clicca sul seguente link per resettare la tua password:</h2>
                <p><a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a></p>
            `
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email di reset password inviata con successo" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore del server" });
    }
};

module.exports = { sendResetEmail };
