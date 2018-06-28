
const mongoose = require('mongoose');
const { permissionsEnum } = require('../Enums/PermissionsEnum'); 
const permission = mongoose.Schema({
    name:{
        type: String,
        enum: permissionsEnum,
        unique: true,
        maxLength: [15, 'length should be less that 15 charachters'],
        match: [ /[A-Za-z]/, 'Role should be only letters' ]
    }
});

const Permission = mongoose.model('Permission', permission);

module.exports = { Permission };