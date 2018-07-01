const { Course }      = require('../models/Course');
const { User }        = require('../models/User');
const { Role }        = require('../models/Role');
const { Permission }  = require('../models/Permission');
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
  const role = await Role.findOne({name: data.role});
  data.role = role._id;
  console.log(data);
  
  const user = await(new User(data)).save();
  const token = await user.generateToken();
  res.send(user);
};

exports.login = async (req, res, next) => {
  
  const data = pick(req.body, ['username', 'password']);
  const user = await User.findOne({username:data.username}).populate(
    {
      path: 'role',
      select: '-_id -permissions -__v'
    }
  );
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
  const data = pick( req.body, ['name'] );
  data.permissions = [];
  console.log(data);
  
  const role = await ( new Role(data) ).save();
  if(!role)return next({message: 'something went wrong', status :500});
  res.status(200).send(role);
}

exports.addPermission = async (req, res ,next) => {
  const data = pick(req.body, ['permission', 'role']);

  const permission = await Permission.findOne({name: data.permission});
  if(!permission) return next({message: 'permission is not valid', status: 500});

  const role =await Role.findOneAndUpdate(
    {name :data.role},
    { $addToSet: { permissions:permission._id } },
    { new: true, runValidators: true} 
  ).populate('permissions');

  if(!role)return next({message: 'couldn\'t find the role',status :500});

  res.status(200).send(role);
}

exports.getUserPermissions = async (req, res, next) => {
  console.log(req.user);
  
 const role = await Role.findById(req.user.role._id).populate(
    {
      path: 'permissions',
      select: '-_id'
    }
  );
  if(!role) return next({message :'no such a Role !!!', status :400 });
  const permissions =  role.permissions.map(per => per.name);
  res.status(200).send(permissions);
}


exports.addPlayer = async (req, res ,next) => {

}