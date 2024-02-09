const { User } = require('../models');

const signUp = ({ userName, email, rol, password }) => {
  try {

    return User.create({
      userName,
      email,
      rol,
      password
    }).then(doc => doc ? ({ ok: true, ...doc }) : ({ ok: false })).catch(err => ({ ok: false, ...err }))

  } catch (error) {
    console.error(error);
    return error;
  }
}

const getUserById = (idUSer) => {
  return User.findById(idUSer).then(doc => doc).catch(err => err);
}

const getUserByIdentification = (identification) => {
  return User.findOne({
    $or: [
      { email: identification },
      { userName: identification }
    ]
  }).then(doc => doc ? ({ ok: true, ...doc }) : ({ ok: false })).catch(err => ({ ok: false, ...err }));
}

module.exports = {
  signUp,
  getUserByIdentification,
  getUserById
}