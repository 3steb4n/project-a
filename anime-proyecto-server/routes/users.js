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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async(req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  if(Object.keys(req.body).length === 0) {
    res.send(400, 'Something broke!');
    return;
  }
  if(typeof(req.body.email) == 'undefined') {
    res.send(400, 'email needed');
    return;
  }
  if(typeof(req.body.username) == 'undefined') {
    res.send(400, 'username needed');
    return;
  }
  if(typeof(req.body.password) == 'undefined') {
    res.send(400, 'password needed');
    return;
  }
  user = await User.findOne({where : {email: req.body.email}}) // busca por username
  if (user) {
    res.send(400, 'Email ya registrado')
    return;
  }
  user = null;
  user = await User.findOne({where : {username: req.body.username}}) // busca por username
  if (user) {
    res.send(400, 'username ya registrado')
    return;
  }

  var usr = {
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt)
  }
  created_user = await User.create(usr)
  res.status(200).json(created_user);
});

router.post('/login', async(req, res, next) => {
  var user;
  if(Object.keys(req.body).length === 0) {
    res.status(400).send('Something broke!')
    return;
  }

  if(typeof(req.body.username) == 'undefined' && typeof(req.body.email) == 'undefined') {
    res.status(400).send('username or email needed')
    return;
  }
  if(req.body.email == '' && req.body.email == '') {
    res.status(400).send('username or email')
    return;
  }
  if(typeof(req.body.email) == 'undefined') {
    user = await User.findOne({where : {username: req.body.username}}) // busca por username
  } else {
    user = await User.findOne({where : {email: req.body.email}}) // busca por email
  }
  
  if (user) {
    if(typeof(req.body.password) == 'undefined' || req.body.password == '') {
      res.send(400, 'password needed');
      return;
    }
    console.log(req.body.password)
    const password_valid = await bcrypt.compare(req.body.password, user.password)
    if(password_valid) {
      const token = jwt.sign({
        "id": user.id,
        "email": user.email,
        "username": user.username,
      }, process.env.JWT_SECRET)
      res.status(200).json({ token: token})
    } else {
      res.status(400).json({ error: 'jerman es un hijo de puta xdxdddxd contrasenia equivocada xdd'})
    }
  } else {
    res.send(400, 'jerman la mama xdxdxdxd');
    return;
  }
})

router.post('/verify_token', async(req, res, next) => {
  var user;
  if(Object.keys(req.body).length === 0) {
    res.status(400).send('Something broke!')
    return;
  }
  const token = req.body.token;
    // If the token is present
    if(token){
 
        // Verify the token using jwt.verify method
        try {
          var decode = jwt.verify(token, process.env.JWT_SECRET);

        } catch (e) {
          return res.json({
            login: false,
            data: 'error token'
          });
        }

        if(!decode) {
          return res.json({
            login: false,
            data: 'error token'
          });
        } else {
          
          //  Return response with decode data
          return res.json({
              login: true,
              data: decode
          });
        }
    }else{
        // Return response with error
        return res.json({
            login: false,
            data: 'error no token'
        });
    }
})

module.exports = router;
