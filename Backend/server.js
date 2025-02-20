const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const db =require("./database")
db()
const PORT = 8080;
const routes = require("./router/routes")
const excuseRouter = require("./router/excuseRouter")

const user = require('./model/user.model')

app.use('/',routes)
app.use('/',excuseRouter)

app.listen(PORT, async() => {
    console.log(`Server running at http://localhost:${PORT}`);
});
