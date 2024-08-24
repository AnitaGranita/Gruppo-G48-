var utentestatsServices = require("./utentestatsServices");
var utenteService = require("./utenteServices");

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
            return res.status(404).json({ msg: 'Statistiche irreperibili' });
        }

        const nickname = await utenteService.findNicknameByEmail(req.user.email);

        if (nickname === null) {
            return res.status(404).json({ msg: 'Nickname non trovato' });
        }

        res.json({
            email: stats.email,
            nickname: nickname,
            totalgames: stats.totalgames,
            gameswon: stats.gameswon,
            gameslost: stats.gameslost,
            won1: stats.won1,
            won2: stats.won2,
            won3: stats.won3,
            won4: stats.won4,
            won5: stats.won5,
            won6: stats.won6
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Errore del server' });
    }
};

var updateUtentestatsControllerFn = async (req, res) => {
    const { won, attempts } = req.body;
    try {
        const stats = await utentestatsServices.findStatsByEmail(req.user.email);

        if (!stats) {
            return res.status(404).json({ msg: 'Statistiche irreperibili' });
        }

        stats.totalgames += 1;
        stats.gameswon += won ? 1 : 0;
        stats.gameslost += won ? 0 : 1;
        stats[`won${attempts}`] += won ? 1 : 0;

        await stats.save();

        res.json({ status: true, message: 'Statistiche aggiornate con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Errore del server' });
    }
};


module.exports = { createUtentestatsControllerFn, statGetterControllerFn, updateUtentestatsControllerFn };