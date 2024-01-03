const express = require('express')
var cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoute");
const bookingRoutes = require("./routes/bookingRoute");
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
app.use("/api/tour",tourRoutes)
app.use('/api/booking',bookingRoutes)


app.listen(4000)

//localhost://8000/api/booking POST
//localhost://8000/api/sign-up