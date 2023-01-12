const mongoose = require('mongoose');

//const MONGODB_URI = process.env.MONGODB_URI;
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://user-services-8167:jWKhNHwZRYXacpCe715z@c4a56388-b2ef-489f-be32-c79ba86eabc0.user-services-8167.mongo.a.osc-fr1.scalingo-dbs.com:30476/user-services-8167?replicaSet=user-services-8167-rs0&ssl=true`;

console.log("url mongo ",MONGODB_URI);

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));