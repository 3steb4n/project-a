const Models = require('./../models');
var express = require('express');
const { Op, Model } = require('sequelize');
require('dotenv').config()
var router = express.Router();

router.get('/search', async (req, res) => {
    Models.AnimeStatus.findAll({
        attributtes: ['id', 'name']
    }).then(value => {
        res.status(200).json({
            code: 200,
            message: value
        });
    }).catch(error => {
        res.status(200).json({
            code: 400,
            message: 'Internal Erro'
        });
        console.log(error);
    })
})

module.exports = router