const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');

const app = express();

//windows.Swal = require('sweetalert2');

const port = process.env.PORT || 4500;

//Seteamos el motor de plantillas
app.set('view engine', 'ejs');

//Seteamos la carpeta publica para archivos publicos
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Seteamos las variable de entorno
dotenv.config({path: './env/.env'});

//para lasx cookies
app.use(cookieParser());


//llamar al router
app.use('/', require('./routes/router'));

app.use(function(req, res, next){
    if(!req.user){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});

app.listen(port, ()=>{
    console.log("Server listening port", port);
});

