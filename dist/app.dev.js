"use strict";

var express = require("express");

var cookieParser = require("cookie-parser");

var connectDB = require("./config/db");

var path = require("path"); //const cors = require("cors");
//const Seed = require("./seed");


var PORT = process.env.PORT;
var app = express();
app.use(express.json({
  extended: false
}));
app.use(cookieParser()); //Connection to Mongo

connectDB(); //Seeds the database
//Seed();
//Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth")); // Serve static assets in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express["static"]("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} //App listen


app.listen(PORT || 3001, function () {
  console.log("Server started on port");
});