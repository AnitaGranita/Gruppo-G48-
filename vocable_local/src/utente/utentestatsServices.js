var utentestatsModel = require('./utentestatsModel');

module.exports.createUtentestatsDBService = (utentestatsDetails) => {

    return new Promise(function myFN(resolve, reject) {
        utentestatsModel.findOne({ email: utentestatsDetails.email }, function (error, existingUser) {
            if (error) {
                reject({ status: false, msg: "Errore durante la verifica dell'email" });
            } else if (existingUser) {
                reject({ status: false, msg: "Email già in uso" }); // Email già presente nel sistema
            } else{

            var utentestatsModelData = new utentestatsModel();

            utentestatsModelData.email = utentestatsDetails.email; //una riga per ogni dato contenuto nella "classe" utente
            utentestatsModelData.totalgames = utentestatsDetails.totalgames;
            utentestatsModelData.gameswon = utentestatsDetails.gameswon;
            utentestatsModelData.gameslost = utentestatsDetails.gameslost;
            utentestatsModelData.won1 = utentestatsDetails.won1;
            utentestatsModelData.won2 = utentestatsDetails.won2;
            utentestatsModelData.won3 = utentestatsDetails.won3;
            utentestatsModelData.won4 = utentestatsDetails.won4;
            utentestatsModelData.won5 = utentestatsDetails.won5;
            utentestatsModelData.won6 = utentestatsDetails.won6;
            

            utentestatsModelData.save(function resultHandle(error, result) { //salva i dati
                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        }}
    )});
}