const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const user_routes=require('./routes/user_routes');
const captain_routes=require('./routes/captain_routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users',user_routes);
app.use('/captain',captain_routes);
module.exports = app;