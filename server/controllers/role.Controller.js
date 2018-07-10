
const { Permission } = require('../models/Permission');
const { Role }       = require('../models/Role');

const pick           = require('lodash/pick');

exports.getRoles = async (req, res, next) =>{
    const roles = await Role.find().select('_id name');
    if(!roles) return next({message: 'no roles so far', status :200})
    res.status(200).send(roles);
}

exports.addRole = async (req, res, next) => {
    const data = pick( req.body, ['name'] );
    data.permissions = [];
    
    const role = await ( new Role(data) ).save();
    if(!role)return next({message: 'something went wrong', status :500});
    res.status(200).send(role);
  }
  
  exports.addPermission = async (req, res ,next) => {
    const data = pick(req.body, ['permission', 'role']);
  
    const permission = await Permission.findOne({name: data.permission});
    if(!permission) return next({message: 'permission is not valid', status: 500});
  
    const role =await Role.findOneAndUpdate(
      { name :data.role },
      { $addToSet: { permissions:permission._id } },
      { new: true, runValidators: true} 
    ).populate('permissions');
  
    if(!role)return next({message: 'couldn\'t find the role',status :500});
  
    res.status(200).send(role);
  }
  
  exports.getUserPermissions = async (req, res, next) => {
    
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
  