const { Player } = require('../models/player');
const { pick } = require('lodash');


exports.addPlayer = async (req, res, next ) => {
    const data = pick(req.body, ['name', 'sureName', 'age', 'possition', 'email']);
    data.creator = req.user._id;

    const player = await (new Player(data).save());
    return res.status(200).send(player);

}