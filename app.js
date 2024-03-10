const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');

const app = express();
const port = 4500;

//Seteamos el motor de plantillas
app.set('view engine', 'ejs');

//Seteamos la carpeta publica para archivos publicos
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Seteamos las variable de entorno
dotenv.config({path: './env/.env'});

//para lasx cookies
//app.use(cookieParser);

//llamar al router
app.use('/', require('./routes/router'));

app.listen(port, ()=>{
    console.log("Server listening port 4500");
});

