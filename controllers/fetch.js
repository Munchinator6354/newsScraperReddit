var db = require("../models");
var scrapedArticlesArray = require("../scripts/scrape");


module.exports = {
    scrapedHeadlines: function (req, res) {
        console.log("we made it into the scrapedHeadlines function")
        // console.log(scrapedArticlesArray.scrape)
        //Scrapes Reddit
        return scrapedArticlesArray.scrape()
            .then(function (dataReadyForDBLog) {
                console.log("we made it into the .then after scraping within scraped Headlines function")
                // console.log(articles + "this is articles")
                console.log(dataReadyForDBLog + "this is dataReadForDBLog")
                // Insert the data in the scrapedData db
                return db.Posts.insert(dataReadyForDBLog);
            })
            .then(function (dbPosts) {
                console.log("dbPosts here!" + dbPosts)
                if (db.Posts.length === 0) {
                    res.json({message: "No new posts today try again later."
                    });
                }
                else {
                    // Otherwise, log the inserted data
                    // console.log(dbPosts);
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
