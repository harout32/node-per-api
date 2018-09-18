const express = require('express');
const api     = express.Router();

const players = require('./players');
const { catchErrors, apiHandle, notFound } = require('../error handlers/errorHandler');
const { authentication }  = require('../middlewares/authentication');
const {isLogedIn} = require('../controllers/authController');
const {
  createCourse,
  getImages,
  createUser,
  login,
  logout,
  addRole,
  addPermission,
  getUserPermissions
} = require('../controllers/apiController');

api.post('/islogedin', catchErrors(isLogedIn));
// api.post('/register' , catchErrors(createUser));
api.post('/login'    , catchErrors(login));
api.get('/logout'    , catchErrors(logout));

// api.post('/role', catchErrors(addRole));
// api.post('/permission', catchErrors(addPermission));
api.get('/getPermissions',authentication, catchErrors(getUserPermissions));
api.use('/players', players );

api.use(notFound);
api.use(apiHandle);

module.exports = api;