const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
var routes = require('./route/routes')
const cors = require('cors')

app.use(cors({
    origin: "http://localho.st:8080"
}));


app.listen(9992, function check(err)
{
    if(err){
        console.log("errore");
    }else{
        console.log("daje");
    }
});


mongoose.connect("mongodb://localho.st:27017/utenti", //NB: "utenti" è il nome del db, senza niente crea il db di "test"
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(
        async()=> {
            console.log("Database connesso")
        },
        (err) => {
            console.log(err, "quindi database non connesso")
        }
    );
    app.use(express.json());
    app.use(routes);