const express = require('express')
const { body, param } = require('express-validator')
const userController = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();

router
  .get('/getUser/:id',
    param('id').notEmpty().withMessage('Es necesario el identificador'),
    userController.getUserById
  )

router
  .post('/',
    body('userName').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('email').notEmpty().withMessage('El email es requerido'),
    body('password').notEmpty().withMessage('El password del usuario es requerido'),
    userController.postUser
  )

router
  .post('/signIn',
    body('identify').notEmpty().withMessage('El nombre de usuario / email es requerido'),
    body('password').notEmpty().withMessage('El password es requerdio'),
    userController.signIn
  )

router
  .get('/veryfyToken', verifyToken, userController.isAuthenticate)

router
  .get("/permissions", verifyToken, userController.getNavByRol)


module.exports = router