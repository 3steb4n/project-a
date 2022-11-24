const Models = require('./../models');
var express = require('express');
const { Op, Model } = require('sequelize');
const { route } = require('./genres');
require('dotenv').config()
var router = express.Router();

router.get("/search", async (req, res) => {
   await Models.typeAnime.findAll({
    attributtes: ['id', 'name']
   }).then(value => {
    res.status(200).json({
        code: 200,
        message: value
    });
   }).catch(error => {
    res.status(200).json({
        code: 400,
        messahe: 'Internal error'
    });
    console.log(error);
   });
})

module.exports = router;