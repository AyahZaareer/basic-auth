'use strict';

require('dotenv').config();
const server = require('./src/sever');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(() => {
    server.start(port);
}).catch((e) => {
    console.error('connection of DB error', e.message);
});
