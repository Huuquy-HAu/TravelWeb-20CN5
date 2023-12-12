const express = require('express')
var cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require("./routes/userRoutes");
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/publics', express.static(path.join(__dirname, './publics')));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.static('public'));


app.use("/", userRoutes)


app.listen(4000)