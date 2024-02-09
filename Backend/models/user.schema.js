const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: [true, "Intenta un usuario diferente"],
    required: [true, "El UserName es requerido"]
  },
  email: {
    type: String,
    unique: [true, "Email no valido"],
    required: [true, "Es necesario el Email"],
    match: [/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, 'Verifica que tu correo es valido']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["ADMIN", "LECTOR", "CREADOR"],
    default: "LECTOR"
  },
  createdDate: {
    type: Date,
    default: new Date()
  }
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});


userSchema.pre('find', function (next) {
  delete this.password;
  next();
})


module.exports = mongoose.model('user', userSchema);