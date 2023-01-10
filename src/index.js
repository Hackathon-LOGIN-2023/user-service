
require('dotenv').config();

const app = require('./server');
require('./database');




// const express = require('express');
// const app = express();
// const morgan=require('morgan');




// app.set('port', process.env.PORT || 3000);



// app.use(require('./api/modelAircraft'));


app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});