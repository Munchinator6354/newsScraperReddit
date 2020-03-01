// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3010;

// Instantiate our Express App
var app = express();

// Require our routes
var routes = require("./routes");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperReddit";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Mongoose connection is successful")
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});















// // Dependencies
// var express = require("express");
// var mongojs = require("mongojs");
// var exphbs = require("express-handlebars");
// var mongoose = require("mongoose");

// // Initialize Express
// var app = express();

// //Database configuration
// var databaseUrl = "scraperReddit";
// var collections = ["Posts"];

// // Hooks mongojs configuration to the db variable
// mongoose.connect('mongodb://localhost/scraperReddit');
// var db = mongojs(databaseUrl, collections);

// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });

// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Make public a static folder
// app.use(express.static("public"));

// // Connect Handlebars to our Express app
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// var routes = require("./routes");

// app.use(routes);

// // Listen on port 3000
// app.listen(3000, function () {
//     console.log("App running on port 3000!");
// });