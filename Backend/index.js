const dotenv = require('dotenv');
dotenv.config();
require('./config/db_settings')

const express = require("express");
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const bodyParser = require('body-parser');

app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With,  Content-Type, Accept, content-type, application/json, Authorization');
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', require('./routes/user.route'))
app.use('/api/categories', require('./routes/category.route'))


app.listen(process.env.PORT, () => console.log(`Api running by ${process.env.PORT}`))