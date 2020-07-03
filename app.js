const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const keys = require('./config/keys');

const app = express();
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error));

const authRouts = require('./routes/auth');
const analyticsRouts = require('./routes/analytics');
const categoryRouts = require('./routes/category');
const orderRouts = require('./routes/order');
const positionRouts = require('./routes/position');

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRouts);
app.use('/api/analytics', analyticsRouts);
app.use('/api/category', categoryRouts);
app.use('/api/order', orderRouts);
app.use('/api/position', positionRouts);

module.exports = app;
