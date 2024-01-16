const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

const app = express();

//Salt and JWT secret

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'minhavelhacomproumeujantarsopauvanozespãorussonocalção'

//Middlewares setup

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());


//MongoDB connection goes here

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Mongo conectado.')
}).catch(err => {
    console.log('Erro ao se conectar.');
    console.log('Erro: '+err);
})

//Here are the routes

app.post('/cadastro', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name, 
            email,
            password:bcrypt.hashSync(password, salt),
        })

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
        console.log(e)
    }
})


//Starting the server

app.listen(4000, () => {
    console.log('Servidor online.')
})