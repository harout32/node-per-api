const express = require('express');
const roleRouter = express.Router();

const {
    catchErrors,
    notFound,
    apiHandle
} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions } = require('../middlewares/permissions');
const {
    addRole,
    addPermission,
    getUserPermissions,
    getRoles
} = require('../controllers/role.Controller');

const {permissionsEnum} = require('../Enums/PermissionsEnum');

roleRouter.use(authentication);
// roleRouter.get('/', catchErrors(getRoles));
// roleRouter.post('/', catchErrors(addRole));
// roleRouter.post('/addPermissionToRole', catchErrors(addPermission));
roleRouter.get('/getUserPermissions', catchErrors(getUserPermissions));

roleRouter.use(notFound);
roleRouter.use(apiHandle);

module.exports = roleRouter;