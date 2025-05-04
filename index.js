const express = require('express');
const app = express();
const todo = require('./src/routes/todoRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/home', todo);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});