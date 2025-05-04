const express = require('express');
const app = express();
const todo = require('./src/routes/todoRoutes');
const cors = require('cors');

var corsOptions = {
    origin: '*', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204 // Untuk beberapa browser yang tidak mengharapkan status 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/home', todo);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;