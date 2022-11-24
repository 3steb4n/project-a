const Models = require('./../models');
var express = require('express');
const { Op, Model } = require('sequelize');
require('dotenv').config()
var router = express.Router();

router.get("/search", async (req, res) => {
    Models.Genre.findAll({
        attributes: ['id', 'name']
    }).then(value => {
        res.status(200).json({
            code: 200,
            message: JSON.parse(JSON.stringify(value))
        });
    }).catch(err => {
        res.status(200).json({
            code: 400,
            message: 'Internal Error'
        });
        console.log(err);
    });
});

module.exports = router