const mongoose = require('mongoose');

const { permissionsEnum } = require('../Enums/PermissionsEnum'); 
const { rolesEnums } = require('../Enums/RolesEnum');

const Permissions = mongoose.Schema({
    name:{
        type: String,
        enum: permissionsEnum,
        unique:  true
           // maxLength: [15, 'length should be less that 15 charachters'],
           // match: [ /[A-Za-z]/, 'Role should be only letters' ]
    }
});

const roleSchema = mongoose.Schema({
    name: {
        enum: rolesEnums,
        type: String,
        require: true,
        trim: true,
        maxLength: [15, 'length should be less that 15 charachters'],
        minLength: [2, 'length should be more that 2 charachters'],
        match: [/[A-Za-z]/, 'Role should be only letters']

    },
    permissions: [{
        type: String,
        enum:{
            values:permissionsEnum,
             message: 'asdqwdasdqwdasdqwsd'
             }
    }]
});

const Role = mongoose.model( 'Role', roleSchema );
module.exports = { Role };