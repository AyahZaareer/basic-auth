'use srict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const router = require('./auth/route');

const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');



// Prepare the express app
const app = express();
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


app.use(router);
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});
app.get('/bad', (req, res) => {
    throw new Error('Something wrong');
})

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => console.log(`Server listen from ${port}`));
    }
}


