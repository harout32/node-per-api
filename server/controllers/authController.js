const {User} = require('../models/User');

exports.isLogedIn = async(req, res, next) => {
  const token = req.header('token');
  const user = await User.findByToken(token);
  //passing the error that is going to be fetched from catchErrors();
  if(!user) return next({message: 'not Authorized',status: 401 });
  res.send(user);
}