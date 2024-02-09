const express = require('express')
const { body } = require('express-validator')
const categoryController = require('../controller/category.controller');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router
  .get("/", verifyToken, categoryController.getCategories)

router
  .post("/",
    verifyToken,
    body("description").notEmpty().withMessage('El nombre de la categoria es requerido'),
    body('acceptVideos').optional(),
    body('acceptImage').optional(),
    body('acceptText').optional(),
    categoryController.setCategory
  )

module.exports = router