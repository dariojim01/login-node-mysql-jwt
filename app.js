const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');

const app = express();
const port = 3500;

//Seteamos el motor de plantillas
app.set('view', 'ejs');

//Seteamos la carpeta publica para archivos publicos
app.set(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Seteamos las variable de entorno
dotenv.config({path: './env/.env'});

app.get('/', (req, res)=>{
    res.send("HELLO DARIO");
});

app.listen(port, ()=>{
    console.log("Server listening port 3500");
});

