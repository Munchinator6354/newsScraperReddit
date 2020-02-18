var db = require("../models");
var scrapedArticlesArray = require("../scripts/scrape");


module.exports = {
    scrapedHeadlines: function (req, res) {
        console.log(scrapedArticlesArray.scrape)
        //Scrapes Reddit
        return scrapedArticlesArray.scrape()
            .then(function (articles) {
                console.log(articles);
                // Insert the data in the scrapedData db
                return db.Posts.insert(articles);
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
