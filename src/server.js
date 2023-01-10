const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4200);


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(express.json());

//Global variables


//Routes 
app.use(require('./api/routes/notes.routes'), require('./api/routes/validate-token'));
app.use(require('./api/routes/users.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));



module.exports = app;
