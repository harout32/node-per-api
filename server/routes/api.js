const express = require('express');
const api     = express.Router();

const playersRouter = require('./players');
const roleRouter = require('./role');

const { catchErrors, apiHandle, notFound } = require('../error handlers/errorHandler');
const { authentication }  = require('../middlewares/authentication');
const {isLogedIn} = require('../controllers/authController');
const {
  createCourse,
  getImages,
  createUser,
  login,
  logout
} = require('../controllers/apiController');

api.post('/islogedin', catchErrors(isLogedIn));
api.post('/register' , catchErrors(createUser));
api.post('/login'    , catchErrors(login));
api.get('/logout'    , catchErrors(logout));


api.use('/players', playersRouter );
api.use('/role', roleRouter)
api.use(notFound);
api.use(apiHandle);

module.exports = api;