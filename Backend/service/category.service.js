const Category = require('../models/categories.schema');


const getCategories = () => {
  try {

    return Category.find().then(docs => {
      if (docs) {
        return {
          ok: true,
          data: docs,
          error: null
        }
      } else {
        return {
          ok: false,
          data: [],
          error: null
        }
      }
    }).catch(err => {
      return {
        ok: false,
        data: [],
        error: err
      }
    })

  } catch (err) {
    console.error(error);
    return { err };
  }
}

const newCategory = (newCategory) => {
  try {
    return Category.create({
      description: newCategory.description,
      acceptVideos: newCategory.acceptVideos || false,
      acceptImage: newCategory.acceptImage || false,
      acceptText: newCategory.acceptText || false
    }).then(doc => doc ? ({ ok: true, ...doc }) : ({ ok: false })).catch(err => ({ ok: false, error: err }))
  } catch (error) {
    return {
      ok: false,
      error
    }
  }
}

module.exports = { getCategories, newCategory }