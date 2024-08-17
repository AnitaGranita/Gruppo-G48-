const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
var routes = require('./route/routes')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 8080;


app.use(cors({
    origin: process.env.START
}));


const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('Server in ascolto sulla porta: ' + listener.address().port)
});


mongoose.connect(process.env.DB_URI, //NB: "utenti" è il nome del db, senza niente crea il db di "test"
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(
        async()=> {
            console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
        },
        (err) => {
            console.log(err, ": database utenti non connesso")
        }
    );
    app.use(express.json());
    app.use(routes);