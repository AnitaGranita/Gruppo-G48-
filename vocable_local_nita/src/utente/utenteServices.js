const utenteModel = require('./utenteModel');
const jwt = require('jsonwebtoken');
const encryptor = require('simple-encryptor')('hqBzkw4H7Iog6561'); // chiave per criptare le password
//const cookieParser = require("cookie-parser");
//app.use(cookieParser());

// Funzione per la creazione di un nuovo utente
module.exports.createUtenteDBService = (utenteDetails) => {
    return new Promise(function myFN(resolve, reject) {
        utenteModel.findOne({ email: utenteDetails.email }, function (error, existingUser) {
            if (error) {
                reject({ status: false, msg: "Errore durante la verifica dell'email" });
            } else if (existingUser) {
                reject({ status: false, msg: "Email già in uso" }); // Email già presente nel sistema
            } else {
                const utenteModelData = new utenteModel();
                utenteModelData.email = utenteDetails.email;
                utenteModelData.nickname = utenteDetails.nickname;

                const encryptedPassword = encryptor.encrypt(utenteDetails.password); // cripta la password
                utenteModelData.password = encryptedPassword;

                utenteModelData.save(function resultHandle(error, result) {
                    if (error) {
                        reject({ status: false, msg: "Errore durante la creazione dell'utente" });
                    } else {
                        resolve({ status: true, msg: "Utente creato con successo" });
                    }
                });
            }
        });
    });
}

// Funzione per il login dell'utente
module.exports.loginUtenteDBService = (utenteDetails) => {
    return new Promise(function myFn(resolve, reject) {
        utenteModel.findOne({ email: utenteDetails.email }, function getresult(errorvalue, result) {
            if (errorvalue) {
                reject({ status: false, msg: "Errore durante il login" ,token : '0',id: '0'});
            } else {
                if (result) {
                    const decryptedPassword = encryptor.decrypt(result.password);
                    if (decryptedPassword === utenteDetails.password) {
                        // Creazione del token JWT
                        const payload = { email: result.email, id: result._id };
                        const options = { expiresIn: '6h' }; // Durata del token
                        const token = jwt.sign(payload, 'balls'/*process.env.JWT_SECRET*/, options); // Sostituire 'secret' con una chiave sicura
                        console.log('Generated Token:', token); // Log del token generato
                        console.log('JWT Secret:', 'balls' /*process.env.JWT_SECRET*/); // Log della chiave segreta
                        const body = { 
                            status: true, 
                            msg: "Utente validato con successo", 
                            token: token, 
                            id: result._id 
                        };
                        console.log(body);
                        resolve(body);
                    } else {
                        reject({ status: false, msg: "Password errata" ,token : '0',id: '0'});
                    }
                } else {
                    reject({ status: false, msg: "Dati non validi" ,token : '0',id: '0'});
                }
            }
        });
    });
}


