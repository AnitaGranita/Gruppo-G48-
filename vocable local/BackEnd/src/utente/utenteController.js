var utenteService = require("./utenteServices");

var createUtenteControllerFn = async (req, res) => //request, response
{
    try
    {
        console.log("\nregistration");
        console.log(req.body);
        var status = await utenteService.createUtenteDBService(req.body);
        console.log(status);

        if (status) { //restituisce un messaggio se ha creato l'utente o se non è riuscito
            res.send({ "status": true, "message": "Utente creato con successo" }); 
        }
        else{
            res.send({ "status": false, "message": "Errore: Impossibile creare l'utente"})
        }
    }
    catch(err)
    {
        console.log(err); //logga in caso di errore
    }
}

var loginUtenteControllerFn = async (req,res) => {
    var result = null;
    console.log("\nlogin");
    console.log(req.body);
    try{
        result = await utenteService.loginUtenteDBService(req.body);
        if(result.status){
            console.log("true")
            res.send({ "status":true, "message":result.msg });
        }
        else{
            console.log("false")
            res.send({ "status":false, "message":result.msg });
        }
    } catch(errore) {
        console.log(errore);
        res.send({"status":false,"message":errore.msg}); //(se la password o l'utente sono errati stampa a video)
    }
}

module.exports = {createUtenteControllerFn,loginUtenteControllerFn};
//esporta le "funzioni" createUtenteControllerFN e loginUtenteControllerFN per darle a routes