const Models = require('./../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var express = require('express');
const { token } = require('morgan');
require('dotenv').config()
// console.log(process.env)
const User = Models.User;
var router = express.Router();

//Create Anime
router.post('/create', (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        res.send(400, 'Error. Request empty');
        return;
    }

    if(req.body.name === null) {
        res.send(400, 'Error. Name is empty');
        return;
    }

    if(isNaN(req.body.numberChapters) || req.body.numberCharpters < 1) {
        res.send(400, 'Error. numberChapter has a invalide value');
        return;
    }

    if(isNaN(req.body.typeAnimeId) || req.body.typeAnimeId < 0) {
        req.send(400, 'Error. typeAnimeId has a invalide value')
    }
});