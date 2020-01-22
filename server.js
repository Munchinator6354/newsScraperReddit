// Dependencies
var express = require("express");
var mongojs = require("mongojs");

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

//Main route
app.get("/", function (req, res) {
    res.send("Hello world");
});

//Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function (error, found) {
        //Throws any errors
        if (error) {
            console.log(error);
        }
        // If there are no errors it ill send the data to the browser as json
        else {
            res.json(found);
        }
    });
})


app.get("/scrape", function (req, res) {

    axios.get("https://www.reddit.com/r/programming/").then(function (response) {

        let $ = cheerio.load(response.data);
        let results = [];
        let commentsLinkArr = [];

        $("article").each(function (i, element) {

            let title = $(element).find("h3").text();
            let link = $(element).find("a").attr("href");

            results.push({
                id: i,
                title: title,
                link: link
            });

        });

        $("a[data-click-id=comments]").each(function (i, element) {

            let commentsLink = $(element).attr("href");

            commentsLinkArr.push({
                id: i,
                commentsLink: commentsLink
            });

        });

        function mergeArrayObjects(arr1, arr2) {
            return arr1.map((item, i) => {
                if (item.id === arr2[i].id) {
                    return Object.assign({}, item, arr2[i])
                }
            })
        }

        // console.log(mergeArrayObjects(results, commentsLinkArr));

        let dataReadyForDBLog = mergeArrayObjects(results, commentsLinkArr);

        // console.log(dataReadyForDBLog);

        // If this found element had an id, title, and link
        if (dataReadyForDBLog !== undefined) {

            // Insert the data in the scrapedData db
            db.scrapedData.insert(dataReadyForDBLog,

                function (err, inserted) {
                    if (err) {
                        // Log the error if one is encountered during the query
                        console.log(err);
                    }
                    else {
                        // Otherwise, log the inserted data
                        console.log(inserted);
                    };
                });

            //Sends a scrape completed message to the browser
            res.send("Scrape Complete");
        };
    });

});



// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});