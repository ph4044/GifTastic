 // "document.ready" makes sure that our JavaScript doesn't get run until the HTML document is finished loading.
$(document).ready(function () {
  // Set initial array of topics.
  var topics = ["Dolphin", "Hippopotamus", "Jaguar", "Killer Whale", "Komodo Dragon", "Lion", "Puffer Fish", "Stingray", "Tiger", "Tiger Shark"];

  // Function for creating and displaying a button for each item in the topics array.
  function displayButtons() {

    // Deleting the buttons prior to adding new buttons.
    $("#buttons-view").empty();

    // Looping through the array of topics.
    for (var i = 0; i < topics.length; i++) {

      // Then dynamically generating buttons for each topic in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var aButton = $("<button>");
      // Adding a class
      aButton.addClass("buttons");
      // Adding a data-attribute with a value of the topic at index i
      aButton.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topic at index i
      aButton.text(topics[i]);
      // Adding the button to the buttons-view div.
      $("#buttons-view").append(aButton);
    }
    displayGifs();
  }
  
  function displayGifs() {
    // Event listener for all button elements.
    $("button").on("click", function () {
      // In this case, the "this" keyword refers to the button that was clicked.
      var clickedButton = $(this).attr("data-name");
      console.log(clickedButton);
      
      // Constructing a URL to search Giphy for the topic.
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedButton + "&api_key=eDohDBPeor0mwQ99AmA7EowpVxfcVMK3&limit=10";
      
      // Performing AJAX GET request.
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data comes back from the API
      .then(function (response) {
        // Storing an array of results in the results variable
        var results = response.data;
        $("#animals").empty();
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          
          // Only including "g" rated results.
          if (results[i].rating == "g") {
            // Creating a new div to display the gif in.
            var gifDiv = $("<div>");
            gifDiv.attr("class", "gif-div");
            
            // Storing the result item's rating, in upper case.
            var rating = results[i].rating.toUpperCase();
            
            // Storing the result item's title.
            var title = results[i].title;
            
            // Creating a paragraph tag with the item's title
            var p1 = $("<p>").text("Title: " + title);
            
            // Creating a paragraph tag with the item's rating
            var p2 = $("<p>").text("Rating: " + rating);
            
            // Creating a new image tag.
              var animalImage = $("<img>");
              
              // Assigning attributes to the image tags.              
              animalImage.attr("data-still", results[i].images.original_still.url); // set data-still url
              animalImage.attr("data-animate", results[i].images.original.url);   // set data-animate url
              animalImage.attr("src", results[i].images.original_still.url);  // set src initially to the data-still url.
              animalImage.attr("data-state", "still");  // set image data-state to "still"

              // Appending the paragraph and gif we created to the "gifDiv" div we just created.
              gifDiv.append(p1);
              gifDiv.append(animalImage);
              gifDiv.append(p2);
              
              // Appending gifDiv to the "#animals" div.
              $("#animals").append(gifDiv);
            }
          }
          toggleImage();
        });
    });
  }
  
  function toggleImage() {
    $("img").on("click", function () {

      var state = $(this).attr("data-state");  // data-state attribute of gif that is clicked on
      var animateImage = $(this).attr("data-animate");  // data-animate attribute of gif that is clicked on
      var stillImage = $(this).attr("data-still");  // data-still attribute of gif that is clicked on

      if (state == "still") {   // if state is still then set src to animateImage
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
      }
      
      else if (state == "animate") {  // if state is animate then set src to stillImage
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
      }
    });
  }

  $("#add-animal").on("click", function () {
    // event.preventDefault() prevents the form from trying to submit itself.
    // Using a form so that the user can hit enter instead of clicking the Submit button.
    event.preventDefault();

    // Here we grab the text from the input box.
    var animal = $("#animal-input").val().trim();

    // The movie from the textbox is then added to the topics array.
    topics.push(animal);

    // calling displayButtons which creates and displays a button for each item in the topics array.
    displayButtons();
  })

  displayButtons();
});