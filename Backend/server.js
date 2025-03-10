const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./database');
const routes = require('./router/routes');
const excuseRouter = require('./router/excuseRouter');


dotenv.config();

const app = express();
const Port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

db();

app.use('/', routes);
app.use('/excuses', excuseRouter);



app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
});
