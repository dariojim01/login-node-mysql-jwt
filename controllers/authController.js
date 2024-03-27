const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conexion = require('../database/db');
const {promisify} = require('util');
const { error } = require('console');
const { nextTick } = require('process');


exports.register = async (req, res) => {
    try{
        const name = req.body.name;
        const user = req.body.user;
        const password= req.body.password;
        console.log(name, user, password);

        let passHash= await bcrypt.hash(password,8);

        conexion.query(`INSERT INTO users (name, user, pass) VALUES ('${name}', '${user}', '${passHash}')`, error=>{
            if(error){
                console.log(error);
                return;
            }
            console.log('user created');
            res.redirect('/');
        })

    } catch (error){
        console.log(error);
    }
        
    }
exports.login = async(req, res) => {
    try{
        const user = req.body.user;
        const password = req.body.password;
        console.log(user, password);
        if(!user || !password){
            res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Please enter user and password",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })

            console.log("No hay usuario o contraseña");
        }else{
            
            conexion.query(`SELECT * FROM users WHERE user = '${user}'`, async(error, results)=>{
                if(results.length == 0 || ! (await bcrypt.compare(password, results[0].pass))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "User or password are incorrect",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                    console.log("Usuario o contraseña incorrecta");
                }else{
                    const id = results[0].id;
                    const token = jwt.sign({id: id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA,

                    })
                    console.log("Token para el user: " + user + " es: " +token);

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions);

                    res.render('login', {
                        alert: true,
                        alertTitle: "Success",
                        alertMessage: "LOGIN ES CORRECTO",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                    })
                }
            })
        }
 
    } catch (error){
        console.log(error);
    }
}

exports.isAuthenticated = async (req, res, next) =>{
    if(req.cookies.jwt){
        try{
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
           // console.log(decodificada);
            conexion.query(`SELECT * FROM users WHERE id = ${decodificada.id}`, (error, results)=>{
                if(!results) {return next()};
                req.user = results[0];
                console.log(req.user);
                return next();
            })
                        
        } catch(error){
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/login');
       next();
    }
    
}

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/login');
}

exports.users= async (req, res, next)=>{
    try{
        const sql = 'SELECT * FROM users';
        const users = await new Promise((resolve, reject)=>{
            conexion.query(sql, (err, result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
        req.nombres = users.map(user => user.user);
        console.log(req.nombres);
        
        next();
        //res.redirect('/usersList');
       
    }catch(error){
        res.status(500).json({
            message: 'Error al obtener las usuarios de prueba'
        });
    }
    

}