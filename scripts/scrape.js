// Require axios and cheerio. This makes scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function () {
    return axios.get("https://www.reddit.com/r/programming/").then(function (response) {

        let $ = cheerio.load(response.data);
        let results = [];
        let commentsLinkArr = [];
        // let id;
        // let title;
        // let link;

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

        return dataReadyForDBLog;
    });
}

module.exports = scrape;

