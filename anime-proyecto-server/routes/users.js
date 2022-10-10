const Models = require('./../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var express = require('express');
const { token } = require('morgan');
require('dotenv').config()
// console.log(process.env)
const User = Models.User;
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    if (Object.keys(req.body).length === 0) {
        res.send(200, {status: 401, message: 'Faltan parametros'});
        return;
    }
    if (typeof (req.body.email) == 'undefined') {
        res.send(200, {status: 401, message: 'Falta email'});
        return;
    }
    if (typeof (req.body.username) == 'undefined') {
        res.send(200, {status: 401, message: 'Falta username'});
        return;
    }
    if (typeof (req.body.password) == 'undefined') {
        res.send(200, {status: 401, message: 'Falta password'});
        return;
    }
    user = await User.findOne({ where: { email: req.body.email } }) // busca por username
    if (user) {
        res.send(200, {status: 401, message: 'Email ya registrado'})
        return;
    }
    user = null;
    user = await User.findOne({ where: { username: req.body.username } }) // busca por username
    if (user) {
        res.send(200, {status: 401, message: 'Username ya registrado'})
        return;
    }

    var usr = {
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt)
    }
    created_user = await User.create(usr)

    
    res.status(200).json({status: 200, message: 'Usuario creado', users: created_user});
});

router.post('/login', async (req, res, next) => {
    var user;
    if (Object.keys(req.body).length === 0) {
        res.send(200, {status: 401, message: 'Falta parametros'});
        return;
    }

    if (typeof (req.body.username) == 'undefined' && typeof (req.body.email) == 'undefined') {
        res.send(200, {status: 401, message: 'Falta email o usuario'})
        return;
    }
    if (req.body.email == '' && req.body.username == '') {
        res.send(200, {status: 401, message: 'Falta email o usuario'})
        return;
    }
    if (typeof (req.body.email) == 'undefined') {
        user = await User.findOne({ where: { username: req.body.username } }) // busca por username
    } else {
        user = await User.findOne({ where: { email: req.body.email } }) // busca por email
    }
    if (user) {
        if (typeof (req.body.password) == 'undefined' || req.body.password == '') {
            res.send(200, {status: 401, message: 'Falta password'});
            return;
        }
        const password_valid = await bcrypt.compare(req.body.password, user.password)
        if (password_valid) {
            const token = jwt.sign({
                "id": user.id,
                "email": user.email,
                "username": user.username,
            }, process.env.JWT_SECRET)
            res.status(200).json({ token: token, message: 'Login correcto', status: 200 })
        } else {
            res.status(200).json({ message: 'jerman es un hijo de puta xdxdddxd contrasenia equivocada xdd', status: 401 })
        }
    } else {
        res.send(200, {status: 400, message: 'Jerman la chupa y no existe esta cuenta xDDD'});
        return;
    }
})

router.post('/verify_token', async (req, res, next) => {
    var user;
    if (Object.keys(req.body).length === 0) {
        res.status(400).send('Something broke!')
        return;
    }
    const token = req.body.token;
    // If the token is present
    if (token) {

        // Verify the token using jwt.verify method
        try {
            var decode = jwt.verify(token, process.env.JWT_SECRET);

        } catch (e) {
            return res.json({
                login: false,
                message: 'token incorrecto'
            });
        }

        if (!decode) {
            return res.json({
                login: false,
                message: 'token no valido'
            });
        } else {
            return res.json({
                status: 200,
                login: true,
                data: decode,
                message: 'aaaa'
            });
        }
    } else {
        // Return response with error
        return res.json({
            login: false,
            message: 'error no token'
        });
    }
})

module.exports = router;
