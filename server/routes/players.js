const express = require('express');
const players = express.Router();

const {catchErrors, notFound, apiHandle} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions }  = require('../middlewares/permissions');

const {
    addPlayer
} = require('../controllers/playersController');


players.post('/', authentication, permissions(['addPlayers']), catchErrors(addPlayer));

players.use(notFound);
players.use(apiHandle);

module.exports = players;