// Example of API search string to use for Wikepidea:
// https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&prop=extracts|info&exintro&explaintext&exsentences=1&exlimit=max&inprop=url&gsrsearch=physics

$(document).ready(function() {

  function getSearchResults(searchQuery) {
    /*************************************************************************
    User enters a search string and hits enter.
    This will fetch the search results from the WikiMedia API
    **************************************************************************/
    //alert("getSearchResults was called with searchQuery" + searchQuery);

    $.ajax ({
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        generator: 'search',
        gsrlimit: 10,
        prop: 'extracts|info',
        exintro: '',
        explaintext: '',
        exsentences: 1,
        exlimit: 'max',
        inprop: 'url',
        gsrsearch: searchQuery,
        format: 'json'
      },
      dataType: 'jsonp',
      headers: {
        'API-User-Agent': 'Exercise/FreeCodeCampWikepediaViewer jackson.ndiho@gmail.com',
        'Content-Type': 'application/json'
      }

    })
    .done(function(data) {

      //alert("ajax call done" + );
      $("#container2").empty();
      var pages = data.query.pages;

      var outerDiv,
          innerDiv,
          titleParagraph,
          extractParagraph,
          title,
          extract,
          fullUrl;

      for (page in pages) {

        outerDiv = $("<div></div>");
        innerDiv = $("<div></div>");

        fullUrl = pages[page]["fullurl"];

        title = pages[page]["title"];
        titleParagraph = $("<p></p>").text(title).addClass("light-primary-color text-center");

        extract = pages[page]["extract"];
        extractParagraph = $("<p></p>").text(extract).addClass("text-left");

        innerDiv.addClass("col-xs-12");
        outerDiv.addClass("row");
        outerDiv.attr("fullUrl", fullUrl);
        titleParagraph.append(extractParagraph);
        innerDiv.append(titleParagraph);
        outerDiv.append(innerDiv);


        $("#container2").append(outerDiv);

        $(outerDiv).on("click", function() {
          var articleUrl = $(this).attr("fullUrl");
          window.open(articleUrl,'_blank');
        });
      }

    })
    .fail(function(data) {
      console.log("It Failed");
    })
  };

$("#searchForm").on("submit", function(event){
  event.preventDefault();
  var searchQuery = $("#searchBox").val();
  getSearchResults(searchQuery);
});

});
