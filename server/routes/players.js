const express = require('express');
const players = express.Router();

const {catchErrors, notFound, apiHandle} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions }  = require('../middlewares/permissions');

const {
    addPlayer,
    getPlayers,
    editPlayer,
    deletePlayer
} = require('../controllers/playersController');


players.post('/', authentication, permissions(['addPlayers']), catchErrors(addPlayer));
players.get('/', authentication, permissions(['viewPlayers']), catchErrors(getPlayers));
players.post('/edit', authentication, permissions(['editPlayers']), catchErrors(editPlayer));
players.post('/delete', authentication, permissions(['editPlayers']), catchErrors(deletePlayer));

players.use(notFound);
players.use(apiHandle);

module.exports = players;