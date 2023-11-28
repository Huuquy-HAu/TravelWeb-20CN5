const express = require('express')
var cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes")
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
}))


app.use("/", userRoutes)


app.listen(4000)