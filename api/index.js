const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


//Middlewares setup

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());


//MongoDB connection goes here


//Here are the routes

app.post('/cadastro', (req, res) => {

})


//Starting the server

app.listen(4000, () => {
    console.log('Servidor online.')
})