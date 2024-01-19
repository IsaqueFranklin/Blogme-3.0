const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Post = require('./models/Post');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();

//Salt and JWT secret

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'minhavelhacomproumeujantarsopauvanozespãorussonocalção'

//Middlewares setup

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:5173'
}));


//MongoDB connection goes here

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Mongo conectado.')
}).catch(err => {
    console.log('Erro ao se conectar.');
    console.log('Erro: '+err);
})

//Get user data from token for private routes

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

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

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('A senha não está correta.')
        }
    } else {
        res.json('Usuário não encontrado.')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/uploadbylink', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now()+'.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    });
    res.json(await newName);
})

//Multer middleware configuration for image upload
const photosMiddleware = multer({dest: 'uploads/'});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
})

app.post('/publicar', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        title, description, addedPhotos, 
        content, dia
    } = req.body;

    Post.create({
        title, description, photos:addedPhotos, 
        content, dia, owner:userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err => {
        throw err;
    }))
})

app.get('/posts', async (req, res) => {
    res.json(await Post.find());
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Post.findById(id));
})

//Starting the server

app.listen(4000, () => {
    console.log('Servidor online.')
})