console.log("app.js is loaded");
$(document).on("click", ".scrape", handlePostScrape);

//Brings in data (JSON) to display in table
function displayResults(redditLinks) {
    // console.log(redditLinks + "redditlinks here");
    // console.log(redditlinks[0].id);
    // var something = JSON.stringify(redditlinks);
    // console.log(something.data);
    //Empty the Table
    // for(var i=0; i<redditLinks.length; i++) {
    //     $("#articles").text(redditLinks[i].id);
    //     $("#articles").text(redditLinks[i].title);
    //     $("#articles").text(redditLinks[i].link);
    //     $("#articles").text(redditLinks[i].commentsLink);
    //     // $("#articles").text(redditLinks[i].id)
    // };
    
    console.log(redditLinks + "THTHISIIIFH")
    console.log(JSON.stringify(redditLinks[0].id) + "OHYEAH")
    $("#articles").text(JSON.stringify(redditLinks));
        // [0].title)
    // $("tbody").empty();
    //Loops through the array

    // redditLinks.forEach(function(redditLinks) {
    //     for (var i=0; i<redditLinks.length; i++) {
    //         $("#articles").text(redditLinks[i].id + "\n" + redditLinks[i].title + "\n" + redditLinks[i].link + "\n" + redditLinks[i].commentsLink)
    //     }
    // });


    // redditLinks.forEach(function(redditLinks) {
    //     //Appends each link's specific property to the table
    //     var tr = $("<tr>").append(
    //         $("<td>").text(redditLinks.id),
    //         $("<td>").text(redditLinks.title),
    //         $("<td>").text(redditLinks.link),
    //         $("<td>").text(redditLinks.commentsLink)
    //     );

    //     $("tbody").append(tr);
    // });
}

function handlePostScrape() {
    console.log('inside handlePostScrape')
    $.get("/api/fetch")
        .then(function(data) {
            console.log(data + "THIS DATA");
            displayResults(data);
        }
    )
}





//When the page loads, get all the data and display the results
$.getJSON("/", function(redditLinks) {
    displayResults(redditLinks);
});