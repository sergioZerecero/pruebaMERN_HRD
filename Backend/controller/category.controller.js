
const _categoryService = require('../service/category.service')

const getCategories = async (req, res) => {
  try {

    const responseCategory = await _categoryService.getCategories();

    if (responseCategory.ok) {
      res.status(200).json({
        ok: true,
        msg: 'categorias encontradas',
        data: responseCategory.data
      })
    } else {
      if (responseCategory.err) {
        res.status(400).json({
          ok: false,
          msg: "Peticion fallida",
          data: [],
          error: responseCategory.err
        })
      } else {
        res.status(404).json({
          ok: false,
          msg: "Sin categorias",
          error: responseCategory.err,
          data: []
        })
      }
    }

  } catch (err) {
    console.log(err);

    res.status(505).json({
      ok: false,
      msg: "Internal error server",
      error: err,
      data: []
    })
  }
}

const setCategory = async (req, res) => {
  try {
    if (req.rol !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "Usted no puede agregar categorias"
      })
    }

    const { description, acceptVideos, acceptImage, acceptText } = req.body;

    const newCategory = await _categoryService.newCategory(
      { description, acceptVideos, acceptImage, acceptText }
    );

    console.log({ newCategory })

    if (newCategory.ok) {
      return res.status(200).json({
        ok: true,
        msg: 'Categoria creada'
      })
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'Error al crear categoria'
      })
    }

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal error server'
    })
  }
}

module.exports = {
  getCategories,
  setCategory
}