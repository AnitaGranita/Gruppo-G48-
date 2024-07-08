var utenteModel = require('./utenteModel');
var key =  'hqBzkw4H7Iog6561'; //chiave per criptare le password (una volta che la decidiamo non possiamo cambiarla)
var encryptor = require('simple-encryptor')(key);

module.exports.createUtenteDBService = (utenteDetails) => {

    return new Promise(function myFN(resolve, reject) {

        var utenteModelData = new utenteModel();

        utenteModelData.email = utenteDetails.email; //una riga per ogni dato contenuto nella "classe" utente
        utenteModelData.password = utenteDetails.password;
        utenteModelData.nickname = utenteDetails.nickname;
        var encrypted = encryptor.encrypt(utenteDetails.password); //cripta la password per proteggerla in caso di fuga di dati
        utenteModelData.password = encrypted;

        utenteModelData.save(function resultHandle(error, result) { //salva i dati
            if (error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports.loginUtenteDBService = (utenteDetails)=>
{
    return new Promise(function myFn(resolve,reject)
    {
        utenteModel.findOne({ email: utenteDetails.email}, function getresult(errorvalue,result)
        {
            if(errorvalue){
                reject({status: false,msg : "Dati non validi"});
            }
            else{
                if(result != undefined && result != null){
                    var decrypted = encryptor.decrypt(result.password);
                    if(decrypted== utenteDetails.password){
                        resolve({status: true,msg:"Utente validato con successo"})
                    }
                    else{
                        reject({status: false,msg: "Password errata"});
                    }
                }
                else{
                    reject({status:false,msg:"Dati undefined o null"});
                }
            }
        });
    });
}