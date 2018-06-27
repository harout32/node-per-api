const express = require('express');
const api     = express.Router();
const { catchErrors, apiHandle, notFound } = require('../error handlers/errorHandler');
const {isLogedIn} = require('../controllers/authController');
const {
  createCourse,
  getImages,
  createUser,
  login,
  logout,
  addRole,
  addPermission
} = require('../controllers/apiController');

api.post('/islogedin', catchErrors(isLogedIn));
api.post('/register' , catchErrors(createUser));
api.post('/login'    , catchErrors(login));
api.get('/logout'    , catchErrors(logout));

api.post('/role', catchErrors(addRole));
api.post('/permission', catchErrors(addPermission))

api.use(notFound);
api.use(apiHandle);

module.exports = api;