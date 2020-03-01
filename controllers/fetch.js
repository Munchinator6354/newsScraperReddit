var db = require("../models");
var scrapedArticlesArray = require("../scripts/scrape");


module.exports = {
    scrapedHeadlines: function (req, res) {
        console.log("we made it into the scrapedHeadlines function")
        console.log(scrapedArticlesArray + "HEYHEYHEY");
        //Scrapes Reddit
        return scrapedArticlesArray.scrape()
            .then(function (dataReadyForDBLog) {
                console.log("we made it into the .then after scraping within scraped Headlines function")
                console.log(dataReadyForDBLog + "this is what dataReadyForDBLog")
                // console.log(dataReadyForDBLog[0])
                // Insert the data in the scrapedData db
                console.log(dataReadyForDBLog[0] + "this is what dataREadyForDBLog[0] looks like");
                return db.Posts.create(dataReadyForDBLog);
            })
            .then(function(dbPosts) {
                console.log(dbPosts);
                console.log("dbPosts here!" + dbPosts)
                if (dbPosts.length === 0) {
                    res.json({
                        message: "No new posts today try again later."
                    });
                }
                else {
                    // Otherwise, log the inserted data
                    console.log("made it inside else statement");
                    res.json({
                        message: "Added " + dbPosts.length + " new Reddit posts!"
                    });
                }
            })
            .catch(function(err) {
                //Sends a scrape completed message to the browser
                res.json({
                    message: "Reddit Scrape Completed!"
                });
            });

    }
};
