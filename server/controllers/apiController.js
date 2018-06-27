const { Course }      = require('../models/Course');
const { User }        = require('../models/User');
const { Role }        = require('../models/Role');
const { catchErrors } = require('../error handlers/errorHandler');
const pick            = require('lodash/pick');
const bycrept         = require('bcrypt');


// exports.createCourse =  async(req, res) => {
//   const course = new Course({
//     description: 'learn node from scratch',
//     imageURL: `${process.env.DOMAIN_NAME}/images/node.png`,
//     name: 'node'
//   });
//   const saveCourse = await course.save();
//   res.json(saveCourse);
// };

exports.createUser = async (req, res) => {
  const data = pick(req.body, ['username','password','email', 'role']);
  const user = await(new User(data)).save();
  const token = await user.generateToken();
  res.send(user);
};

exports.login = async (req, res, next) => {
  const data = pick(req.body, ['username', 'password']);
  const user = await User.findOne({username:data.username});
  if(!user) return next({message:'You\'r Credentials are not Correct!!', status:401});
  //compare hashed password with the plane text one
  const validPass = await bycrept.compare(data.password, user.password);
  if(!validPass) return next({message:'You\'r Credentials are not Correct!!', status:401});
  await user.generateToken();
  res.status(200).send(user);
}

exports.logout = async ( req, res, next) => {
  const token  = req.headers.token;
  const user = await User.findByToken(token);
  if(!user ) return next({message:' Not Authorized!!', status: 401});
  user.token = null;
  await user.save();
  res.status(200).send({message: 'You are logged out!'});
}

exports.addRole = async (req, res, next) => {
  const data = pick(req.body, ['name']);
  const role = await (new Role(data)).save();
  if(!role)return next({message: 'something went wrong', status :500});
  res.status(200).send(role);
}

exports.addPermission = async (req, res ,next) => {
  const data = pick(req.body, ['permission', 'role']);
  const role =await Role.findOneAndUpdate( {name :data.role},{$push: { permissions:data.permission }}, { 'new': true} );
  if(!role)return next({message: 'couldn\'t find the role',status :500});
  res.send(role);
  // await role.save();
  // res.status(200).send(role);
}
