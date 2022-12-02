const mongoose = require('mongoose');

let conn = process.env.MONGO_URL;
console.log("Connecting to DB");
mongoose.connect(conn).then( dres => {
    console.log('Connected to DB');
});
