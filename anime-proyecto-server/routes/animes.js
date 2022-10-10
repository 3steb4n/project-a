const Models = require('./../models');
const bcrypt = require("bcrypt");
var express = require('express');
require('dotenv').config()
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/test', (req, res, next) => {
    res.send(400, 'Yes');
})
//Create Anime
router.post('/create', async (req, res, next) => {
    let animeInformation = {}

    if(Object.keys(req.body).length === 0) {
        res.send(400, 'Error. Request empty');
        return;
    } else {
        animeInformation = {
            name: req.body.name,
            sinopsis: req.body.description,
            season: req.body.seasonal,
            year: req.body.year,
            urlPreview: req.body.urlPreview,
            urlTrailer: req.body.urlTrailer,
            numberEpisodes: req.body.numberChapters,
            typeAnimeId: req.body.typeAnimeId,
            genresList: req.body.genresList
        }
    }

    if(animeInformation.name == "" || animeInformation.name === undefined) {
        res.status(400).json({ 
            status: 400,
            message: 'Error. name is empty'
        })
        return;
    }

    if(isNaN(animeInformation.numberEpisodes) || animeInformation.numberEpisodes < 0 || !Number.isInteger(animeInformation.numberEpisodes)) {
        res.status(400).json({
            status: 400,
            message: 'Error. numberChapter has a invalide value'
        });
        return;
    }

    if(animeInformation.season !== undefined) {
        const seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
        
        for(let i = 0; i < seasons.length; i++){
            if(animeInformation.season === seasons[i]) {
                break;
            }

            if(i === (seasons.length - 1)) {
                res.status(400).json({ 
                    status: 400, 
                    message: 'Error. Season invalid' 
                });
                return;
            }
        }
    }

    if(animeInformation.year == undefined) {
        res.status(400).json({
            status:400,
            message: 'Error. year is empty'
        });
        return;
    }else{
        //console.log(animeInformation.year.toString()[0]);
        if(isNaN(animeInformation.year) || !Number.isInteger(animeInformation.year) || animeInformation.year.toString().length < 4 
        || animeInformation.year.toString().length > 4 || animeInformation.year.toString()[0] > 2) {
            res.status(400).json({ 
                status: 400,
                message: 'Error. year is not valid'
            });
            return;
        }
    }

    if(animeInformation.urlPreview != undefined) {
        try {
            new URL(animeInformation.urlPreview);
        }catch{
            res.status(400).json({
                error: 404,
                message: 'Error. urlPreview is not valid' 
            });
            return;
        }
    }else{
        res.status(400).json({ 
            error: 404, 
            message: 'Error. urlPreview is empty'
        });
        return;
    }

    if(animeInformation.urlTrailer != undefined) {
        try{
            new URL(animeInformation.urlTrailer);
        }catch{
            res.status(400).json({
                error: 400,
                message: 'Error. urlTrailer is not validate'
            });
            return;
        }
    }

    if(animeInformation.typeAnimeId != undefined) {
        if(isNaN(animeInformation.typeAnimeId) || animeInformation.typeAnimeId <= 0 || !Number.isInteger(animeInformation.typeAnimeId)) {
            res.status(400).json( { error: 400,  message: 'Error. typeAnimeId has a invalide value' });
            return;
        }else{
            try {
                let typeAnime = await Models.typeAnime.findOne({ where: { id: animeInformation.typeAnimeId} });
                if(typeAnime == null) {
                    res.status(400).json({ 
                        error: 400, message: 'Error. typeAnimeId dont exists' 
                    });
                    return;
                }
            }catch{
                res.status(400).json({ 
                    status: 400,
                    message: 'Internal error'
                })
                return;
            }
        }
    }

    if(!Array.isArray(animeInformation.genresList)) {
        res.status(400).json({ 
            status: 400,
            message: 'Error. genresList must be array'
         })
        return;
    }

    if(Array.isArray(animeInformation.genresList)) {
        if(animeInformation.genresList.length === 0) {
            res.status(400).json({ 
                status: 400,
                message: 'Error. The genresList array is empty'
             });
            return;
        }else{
            for(let i = 0; i  < animeInformation.genresList.length; i++) {
                if(isNaN(animeInformation.genresList[i]) || animeInformation.genresList[i] === 0 || !Number.isInteger(animeInformation.genresList[i])) {
                    res.status(400).json({ 
                        status: 400,
                        message: 'Error. Invalid value on genresList'
                    });
                    return;
                }
            }
            let genresFilters = animeInformation.genresList.filter((subject, index) => {
                return animeInformation.genresList.indexOf(subject) === index;
            });
            console.log(genresFilters);
            try {
                for(let i = 0; i  < genresFilters.length; i++) {
                    let listGenre = await Models.Genre.findOne({ where: { id: genresFilters[i] } });
                    if(listGenre == null) {
                        res.status(400).json({
                            status: 400,
                            message: 'Error. The genre dont exists'
                        });
                        return;
                    }
                }
            }catch{
                res.status(400).json({ 
                    message: 'Error. Internal error'
                 });
                return;
            }
        }
    }
    try{
        const animeGenerated = async () => Models.anime.create({
            name: animeInformation.name,
            description: animeInformation.sinopsis,
            season: animeInformation.season,
            year: animeInformation.year,
            url_preview: animeInformation.urlPreview,
            url_trailer: animeInformation.urlTrailer,
            number_chapter: animeInformation.numberEpisodes,
            anime_type_id: animeInformation.typeAnimeId,
            status_id: 1
        }, { fields: ['name', 'description', 'season', 'year', 'url_preview', 'url_trailer', 'number_chapter', 'anime_type_id', 'status_id'] })
        .then(result => {
            let genresFilters = animeInformation.genresList.filter((subject, index) => {
                return animeInformation.genresList.indexOf(subject) === index;
            });
            let idAnime = JSON.parse(JSON.stringify(result)).id;
            genresFilters.map(async value => {
                Models.AnimeGenre.create({
                    anime_id: idAnime,
                    genre_id: value
                });
            });
            res.status(200).json({
                status: 200,
                message: 'Anime registrado!'
            });
            return;
        });
        await animeGenerated();
    }catch{
        res.status(400).json({
            status: 400,
            message: 'Internal error'
        })
        return;
    }
});

module.exports = router;