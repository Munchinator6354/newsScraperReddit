// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Require axios and cheerio. This makes scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();


axios.get("https://www.reddit.com/r/programming/").then(function (response) {

    let $ = cheerio.load(response.data);

    let results = [];
    let commentsLinkArr = [];
    // let title;
    // let link;
    // let commentsLink;

    $("article").each(function (i, element) {

        let title = $(element).find("h3").text();

        // let commentsLink = $(element).find("a, ")

        let link = $(element).find("a").attr("href");

        results.push({
            id: i,
            title: title,
            link: link
        });

    });

    $("a[data-click-id=comments]").each(function (i, element) {

        let commentsLink = $(element).attr("href");

        commentsLinkArr.push ({
            id: i,
            commentsLink: commentsLink
        });

    });

    // results.push({
    //     title: title,
    //     link: link,
    //     commentsLink: commentsLink
    // });

    // console.log(results);
    // console.log(commentsLinkArr);

    function mergeArrayObjects(arr1, arr2) {
        return arr1.map((item, i) => {
            if (item.id === arr2[i].id) {
                return Object.assign({}, item, arr2[i])
            }
        })
    }

    console.log(mergeArrayObjects(results, commentsLinkArr));

});