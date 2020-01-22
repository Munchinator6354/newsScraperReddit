
//Brings in data (JSON) to display in table
function displayResults(redditLinks) {
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
$.getJSON("/all", function(redditLinks) {
    displayResults(redditLinks);
});