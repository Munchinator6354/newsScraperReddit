var db = require("../models");

import scrape from "../scripts/scrape";
// var scrape = require("../scripts/scrape");   (ES5 import)

module.exports = {
    scrapedHeadlines: function (req, res) {
        return scrape().then(function (articles) {
            // If this found element had an id, title, and link
            if (articles !== undefined) {
                // Insert the data in the scrapedData db
                return db.scrapedData.insert(articles).then(function(err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                            res.json({message: "Scrape Complete"});
                        };
                    });

                //Sends a scrape completed message to the browser
            };
        });
    }
};