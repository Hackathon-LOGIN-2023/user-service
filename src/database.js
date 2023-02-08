const mongoose = require('mongoose');

//const MONGODB_URI = process.env.MONGODB_URI;
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = ``;

console.log("url mongo ",MONGODB_URI);

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
