// Require axios and cheerio. This makes scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
    scrape: function () {
        return axios.get("https://www.reddit.com/r/programming/").then(function (response) {
            // console.log(response.data + "this is response.data")
            let $ = cheerio.load(response.data);
            console.log("Scraping Has Started!");
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
            console.log(dataReadyForDBLog)
            return dataReadyForDBLog;


        });
    }
};

