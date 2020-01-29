var router = require("express").Router();
var db = require("../../models");
// Require axios and cheerio. This makes scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/", function(req, res) {
    db.Post.find({saved:false})
    .sort({date:-1})
    .then(function(redditPosts) {
        res.render("home", {handlebarsNews: redditPosts});
        console.log(redditPosts);
    });
    console.log("test");
});

module.exports = router;

// //These are front end routes


// var router = require("express").Router();
// var db = require("../models");

// router.get("/", function(req, res) {
//     db.scrapedData.find({ saved: false})
//     .sort({ date: -1 })
//     .then(function(data) {
//         res.render("home", { articles: data});
//     });
// });

// //Main route
// app.get("/", function (req, res) {
//     db.scrapedData.find({}, function (error, found) {
//         //Throws any errors
//         if (error) {
//             console.log(error);
//         }
//         // If there are no errors it ill send the data to the browser as json
//         else {
//             res.json("home", {artcles: found});
//         }
//     });
// });

// //Retrieve data from the db
// app.get("/all", function (req, res) {
//     // Find all results from the scrapedData collection in the db
//     db.scrapedData.find({}, function (error, found) {
//         //Throws any errors
//         if (error) {
//             console.log(error);
//         }
//         // If there are no errors it ill send the data to the browser as json
//         else {
//             res.json(found);
//         }
//     });
// })


router.get("/scrape", function (req, res) {

    axios.get("https://www.reddit.com/r/programming/").then(function (response) {
        let $ = cheerio.load(response.data);
        let results = [];
        let commentsLinkArr = [];

        $("article").each(function (i, element) {

            let title = $(element).find("h3").text();
            let link = $(element).find("a").attr("href");

            results.push({
                // id: i,
                title: title,
                link: link
            });
            
        });
console.log(results);
    //     $("a[data-click-id=comments]").each(function (i, element) {

    //         let commentsLink = $(element).attr("href");

    //         commentsLinkArr.push({
    //             id: i,
    //             commentsLink: commentsLink
    //         });

    //     });

    //     function mergeArrayObjects(arr1, arr2) {
    //         return arr1.map((item, i) => {
    //             if (item.id === arr2[i].id) {
    //                 return Object.assign({}, item, arr2[i])
    //             }
    //         })
    //     }

    //     // console.log(mergeArrayObjects(results, commentsLinkArr));

    //     let dataReadyForDBLog = mergeArrayObjects(results, commentsLinkArr);

    //     // console.log(dataReadyForDBLog);

    //     // If this found element had an id, title, and link
    //     if (dataReadyForDBLog !== undefined) {

    //         // Insert the data in the scrapedData db
    //         db.Post.insert(dataReadyForDBLog,

    //             function (err, inserted) {
    //                 if (err) {
    //                     // Log the error if one is encountered during the query
    //                     console.log(err);
    //                 }
    //                 else {
    //                     // Otherwise, log the inserted data
    //                     console.log(inserted);
    //                 };
    //             });

    //         //Sends a scrape completed message to the browser
    //         res.send("Scrape Complete");
    //     };
    });

});


// router.get("/redditlinks", function(req, res) {
//     res.send("hello");
//     db.scrapedData.find({})
//         .then(function(redditArticle) {
//             res.json(redditArticle);
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });


