const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _userService = require('../service/user.service');

const postUser = (async (req, res) => {
  try {

    const bodyUser = req.body;

    const newUser = await _userService.signUp({
      userName: bodyUser.userName,
      email: bodyUser.email,
      password: bodyUser.password
    });

    if (newUser.ok) {
      delete newUser.ok;
      res.status(200).json({
        ok: true,
        msg: 'User created'
      })
    } else {
      delete newUser.ok;
      let message = newUser.code === 11000 ? `Elije un ${Object.getOwnPropertyNames(newUser.keyPattern)} distinto` : "Error al registrar";

      for (const key in newUser.errors) {
        if (newUser.errors.hasOwnProperty(key)) {
          const obj = newUser.errors[key];
          // Verificar si el objeto tiene la propiedad "message"
          if (obj.hasOwnProperty('message')) {
            message = obj.message;
            break;
          }
        }
      }

      res.status(400).json({
        ok: false,
        msg: message
      })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      data: null,
      error: {
        msg: {
          endponit: "user/",
          method: "newUser",
          error
        }
      }
    })
  }
});

const signIn = (async (req, res) => {
  try {

    const bodyUser = req.body;

    const userDB = await _userService.getUserByIdentification(bodyUser.identify);

    if (userDB.ok) {

      const { _doc: user } = userDB

      bcrypt.compare(bodyUser.password, user.password, (err, validator) => {

        if (!validator || err) {
          return res.status(400).json({
            ok: false,
            msg: 'Usuario / password invalido'
          })
        }

        const token = jwt.sign({
          rol: userDB._doc.role
        }, process.env.JWT_KEY, { expiresIn: '8h' })

        return res.status(200).json({
          ok: true,
          data: {
            user: userDB.userName,
            token
          }
        })
      })
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / password invalido'
      })

    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      data: null,
      error: {
        msg: {
          endponit: "user/login",
          method: "signIn",
          error
        }
      }
    })
  }
})

const getUserById = (async (req, res) => {
  try {

    const idUser = req.params['id'];
    const userDB = await _userService.getUserById(idUser)

    if (!userDB.idUser)
      return res.status(404).json({
        ok: false,
        data: userDB,
        msg: "Not Found"
      })


    return res.status(201).json({
      ok: false,
      data: userDB,
      msg: "ok"
    })


  } catch (error) {
    res.status(500).json({
      ok: false,
      data: null,
      error: {
        msg: {
          endponit: "user/:Id",
          method: "getUserById",
          error
        }
      }
    })
  }
})

const isAuthenticate = (req, res) => {
  res.status(201).json({ ok: true })
}

const getNavByRol = (req, res) => {

  let permissions = {}
  switch (req.rol) {
    case 'ADMIN':
      permissions = { permissions: [true, true, true, true], menu: [{ label: "Categorias", position: 1, onClick: "{false}" }, { label: "Agregar Categoria", position: 2, onClick: "{handleOpenNewCategory}" }, { label: "Administracion de usuarios", position: 3, onclick: "{false}" }] }
      break;
    case "CREADOR":
      permissions = { permissions: [true, true, true, false], menu: [{ label: "Categorias", position: 1 }] }
      break;
    default:
      permissions = { permissions: [true, false, false, false], menu: [{ label: "Categorias", position: 1 }] }
      break;
  }

  res.status(201).json({
    ok: true,
    data: permissions
  })
}

module.exports = {
  postUser,
  signIn,
  getUserById,
  isAuthenticate,
  getNavByRol
}