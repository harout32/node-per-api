const express = require('express');
const players = express.Router();

const {catchErrors, notFound, apiHandle} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions }  = require('../middlewares/permissions');

const { permissionsEnum } = require('../Enums/PermissionsEnum');
const {
    addPlayer,
    getPlayers,
    editPlayer,
    deletePlayer
} = require('../controllers/playersController');

players.use(authentication);
players.post('/', permissions([permissionsEnum.addPlayers]), catchErrors(addPlayer));
players.get('/', permissions([permissionsEnum.viewPlayers]), catchErrors(getPlayers));
players.post('/edit', permissions([permissionsEnum.editPlayers]), catchErrors(editPlayer));
players.post('/delete', permissions([permissionsEnum.editPlayers]), catchErrors(deletePlayer));

players.use(notFound);
players.use(apiHandle);

module.exports = players;