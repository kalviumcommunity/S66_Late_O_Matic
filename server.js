const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const db =require("./database")
db()
const PORT = 8080;
const routes = require("./router/routes")

const user = require('./model/user.model')

app.use('/',routes)

app.listen(PORT, async() => {
 
    console.log(`Server running at http://localhost:${PORT}`);

});



