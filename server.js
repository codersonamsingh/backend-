const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require('dotenv/config')
const cookieSession = require('cookie-session')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//bring all routes
const fileupload = require("./routes/api/v1/other/fileupload");
//bring all routes
const passwordAuth = require("./routes/api/v1/auth/passwordAuth");

// Auth
const createAccount = require("./routes/api/v1/auth/createAccount");
// BMS
const allBookingApi = require("./routes/api/v1/bms/booking/allBookingApi");
const allSignUpFlowApi = require("./routes/api/v1/forPos/signUpFlow/allSignUpFlowApi");
// Role
const allRoleApi = require("./routes/api/v1/bms/role/allRoleApi");
// POS 
const allQuoteApi = require("./routes/api/v1/forPos/quote/allQuoteApi");
const allMappingApi = require("./routes/api/v1/forPos/mapping/allMappingApi");



//passport 
// const passport = require("./services/passport")
const app = express();
//cookie
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:['akjsdfkjk']
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(upload({ useTempFiles: true }));
app.use(cors());

//Middleware for bodyparser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client/build")))


//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db , { useFindAndModify: false, useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));

  //import Models
  require("./Models/User")

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);
require('./services/passport')


//actual routes
app.use("/api/v1/other/fileupload", fileupload);

//actual routes
app.use("/api/v1/auth/passwordAuth", passwordAuth);
// Auth
app.use("/api/v1/auth/createAccount", createAccount);
// BMS
app.use("/api/v1/bms/booking", allBookingApi);
app.use("/api/v1/bms/role", allRoleApi);

//Pos
app.use("/api/v1/forPos/signUpFlow", allSignUpFlowApi);
app.use("/api/v1/forPos/quote", allQuoteApi);
app.use("/api/v1/forPos/mapping", allMappingApi);


app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));

