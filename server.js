// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var exphbs = require("express-handlebars");

// Require axios and cheerio. This makes scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//Database configuration
var databaseUrl = "scraperReddit";
var collections = ["scrapedData"];

// Hooks mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes");

app.use(routes);

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});