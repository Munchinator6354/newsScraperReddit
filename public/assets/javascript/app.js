console.log("app.js is loaded");
$(document).on("click", ".scrape", handlePostScrape);

function handlePostScrape() {
    console.log('inside handlePostScrape')
    $.get("/api/fetch")
        .then(function(data) {
            console.log(data);
            displayResults(data);
        }
    )
}

//Brings in data (JSON) to display in table
function displayResults(redditLinks) {
    // console.log(redditLinks + "redditlinks here");
    // console.log(redditlinks[0].id);
    // var something = JSON.stringify(redditlinks);
    // console.log(something.data);
    //Empty the Table
    $("tbody").empty();
    //Loops through the array
    redditLinks.forEach(function(redditLinks) {
        //Appends each link's specific property to the table
        var tr = $("<tr>").append(
            $("<td>").text(redditLinks.id),
            $("<td>").text(redditLinks.title),
            $("<td>").text(redditLinks.link),
            $("<td>").text(redditLinks.commentsLink)
        );

        $("tbody").append(tr);
    });
}



//When the page loads, get all the data and display the results
$.getJSON("/", function(redditLinks) {
    displayResults(redditLinks);
});