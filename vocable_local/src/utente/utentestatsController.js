var utentestatsServices = require("./utentestatsServices");

var createUtentestatsControllerFn = async (req, res) => //request, response
{
    try
    {
        console.log("\nregistrationstats");
        console.log(req.body);
        var status = await utentestatsServices.createUtentestatsDBService(req.body);
        console.log(status);

        if (status) { //restituisce un messaggio se ha creato l'utente o se non è riuscito
            res.send({ "status": true, "message": "Utentestats creato con successo" }); 
        }
        else{
            res.send({ "status": false, "message": "Errore: Impossibile creare l'utentestats"})
        }
    }
    catch(err)
    {
        console.log(err); //logga in caso di errore
    }
}

module.exports = {createUtentestatsControllerFn};
//esporta le "funzioni" createUtenteControllerFN e loginUtenteControllerFN per darle a routes