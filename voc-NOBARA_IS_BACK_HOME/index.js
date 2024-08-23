const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./route/routes'); 
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', false);

app.use(cors({
    origin: 'http://localhost:5173', // Porta e dominio del client
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Aggiungi altri metodi se necessario
    allowedHeaders: ['Content-Type', 'Authorization'] // Aggiungi altri header se necessario
}));

app.use(express.json());
app.use('/api', routes); // Assicurati che il prefisso '/api' sia corretto

app.listen(9992, () => {
    console.log("Server in ascolto sulla porta 9992");
});

mongoose.connect("mongodb://localhost:27017/utenti", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    },
    (err) => {
        console.log(err, ": database utenti non connesso");
    }
);
