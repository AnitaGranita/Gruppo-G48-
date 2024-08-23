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

var statGetterControllerFn = async (req, res) => {
    try {
        const stats = await utentestatsServices.findStatsByEmail(req.user.email);

        if (!stats) {
            return res.status(404).json({ msg: 'statistiche irreperibili' });
        }

        // Restituisci i dettagli dell'utente
        console.log('retrieval avvenuto con successo')
        res.json({
            email: stats.email,
            totalgames: stats.totalgames,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Errore del server' });
    }
}

module.exports = {createUtentestatsControllerFn, statGetterControllerFn};
//esporta le "funzioni" createUtenteControllerFN e loginUtenteControllerFN per darle a routes