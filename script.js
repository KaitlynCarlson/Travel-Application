function buildQueryURLFlight() {
  var adventureLocation = $("#adventureLocationInput").val();
  var userLocation = $("#userLocationInput").val();
  // var `cityId` = "";
  var startDate = $("#startDateInput").val();
  var endDate = $("#endDateInput").val();
  // console.log(adventureLocation);
  // console.log(userLocation);
  // console.log(startDate);
  // console.log(endDate);
  var destinationLocation = {
    async: true,
    crossDomain: true,
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" +
      adventureLocation,
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
    }
  };
  $.ajax(destinationLocation).done(function(adventure) {
    // console.log(adventure);
    var location = adventure.Places[0].PlaceName;

    //   console.log(location);

    Lol(adventure.Places[0].CityId);
  });

  function Lol(cityId) {
    var userInfo = {
      async: true,
      crossDomain: true,
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" +
        userLocation,
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
      }
    };
    $.ajax(userInfo)
      .fail(function(err) {
        console.error(err, "found an error, need to try again!");
      })
      .done(function(userresponse) {
        //   console.log(userresponse);
        //   console.log(userLocation);
        var userCityId = userresponse.Places[0].CityId;
        //   console.log(userCityId);
        //   console.log(cityId);
        var flightSearch = {
          async: true,
          crossDomain: true,
          url:
            "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" +
            userCityId +
            "/" +
            cityId +
            "/" +
            startDate +
            "?inboundpartialdate=" +
            endDate,
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
          }
        };
        $.ajax(flightSearch).then(function(adventureFlight) {
          console.log(adventureFlight);

          searchFlightPriceAndProvider(adventureFlight);
        });
      });
  }
}

function searchFlightPriceAndProvider(adventureFlight) {
  var fly = adventureFlight;

  var displayFlightCard = $('<div class="card-body"></div>');
  var displayFlightTitle = $('<h4 class="card-title"></h4> ');
  var displayFlightBody = $('<p class="card-text"></p>');
  var flightCarrier;
  for (var i = 0; i < fly.Quotes.length; ++i) {
    var flightPrices = fly.Quotes[i].MinPrice;

    for (var j = 0; j < fly.Carriers.length; ++j) {
      if (
        fly.Carriers[j].CarrierId === fly.Quotes[i].OutboundLeg.CarrierIds[0]
      ) {
        flightCarrier = fly.Carriers[j].Name;
        displayFlightBody.append(
          "Fly with " + flightCarrier + " for  $" + flightPrices + "<br>"
        );
      }
    }
  }
  displayFlightTitle.append("Flights found for " + $("#startDateInput").val());
  displayFlightCard.append([displayFlightTitle, displayFlightBody]);
  $("#flight-display").append(displayFlightCard);
}

function buildQueryURLSleep() {
  var adventureLocationHotel = $("#adventureLocationInput").val();
  var checkIn = $("#startDateInput").val();
  var adventureHotelLocation = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/locations/search?query=" +
      adventureLocationHotel +
      "&lang=en_US&units=km",
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "2778688141msh106169e0d4b6f62p121e94jsn21f4d9f51cba"
    }
  };
  $.ajax(adventureHotelLocation).done(function(hotelId) {
    // console.log(hotelId);
    var hotelLocationId = hotelId.data[0].result_object.location_id;
    var adventureHotelsAvailable = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&subcategory=hotel%252Cbb%252Cspecialty&pricesmax=" +
        "&hotel_class=1%252C2%252C3&currency=USD&limit=30&checkin=" +
        checkIn +
        "&order=asc&lang=en_US&sort=recommended&nights=1&location_id=" +
        hotelLocationId +
        "&adults=1&rooms=1",
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "2778688141msh106169e0d4b6f62p121e94jsn21f4d9f51cba"
      }
    };

    $.ajax(adventureHotelsAvailable).done(function(hotelInfo) {
      // console.log(hotelInfo);
      var adventureHotelOptions = hotelInfo.data;
      for (var i = 0; i <= 4; ++i) {
        var hotelName = adventureHotelOptions[i].name;
        var hotelRating = adventureHotelOptions[i].rating;
        var priceRange = adventureHotelOptions[i].price;
        var image = adventureHotelOptions[i].photo.images.small.url;
        var hotelRanking = adventureHotelOptions[i].ranking;
        var displayHotelInfo = $('<div class="card-body"></div>');
        var displayHotelImage = $("<h4></h4>");
        var displayHotelTitle = $('<h4 class="card-title"></h4> ');
        var displayHotelBody = $('<p class="card-text"></p> ');
        var hotelImage = $("<img>");
        $(hotelImage).attr("src", image);
        var saveHotel = $("<button class = btn-outline-dark>").on(
          "click",
          appendToSomethingDiv
        );
        saveHotel.text("Mark Your Spot");
        displayHotelImage.append(hotelImage);
        displayHotelTitle.prepend(displayHotelImage);
        displayHotelTitle.append(hotelName);

        displayHotelBody.append(
          "Rated: " + hotelRating + " " + "<br>",
          "Prices ranging from " + priceRange + " " + "<br>",
          "Ranked as the " + " " + hotelRanking
        );
        displayHotelInfo.append([
          displayHotelTitle,
          displayHotelBody,
          saveHotel
        ]);

        $("#hotel-display").append(displayHotelInfo);
      }
    });
  });
}
//ACTIVE SELECTOR
var userDestination = $("#adventureLocationInput").val();

//TEST SELECTOR
var activitySave;
function findActivities() {
  //ACTIVE SELECTOR
  var userDestination = $("#adventureLocationInput").val();
  var destinationInfo = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/locations/search?query=" +
      userDestination +
      "&lang=en_US",
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "2778688141msh106169e0d4b6f62p121e94jsn21f4d9f51cba"
    }
  };

  $.ajax(destinationInfo).done(function(destinationResponse) {
    var destinationID = destinationResponse.data[0].result_object.location_id;
    // console.log("This is the destination ID " + destinationID);

    var activityInfo = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&limit=30&bookable_first=false&subcategory=36&location_id=" +
        destinationID,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "2778688141msh106169e0d4b6f62p121e94jsn21f4d9f51cba"
      }
    };

    $.ajax(activityInfo).done(function(activityResponse) {
      // console.log(activityResponse);
      var activityChoice = activityResponse.data;

      appendActivities(activityChoice);

      function appendActivities() {
        for (var i = 0; i <= 4; i++) {
          var activityName = activityChoice[i].name;
          var activityRank = activityChoice[i].ranking;

          var activityList = $('<div class="card-body"></div>');
          var displayActivityName = $('<h4 class="card-title"></h4> ');
          var displayActivityRank = $('<p class="card-text"></p> ');

          // I created buttons inside the card that we can target later using 'this' for storage
          activitySave = $("<button class='btn-outline-dark'>").on(
            "click",
            appendToSomethingDiv
          );
          activitySave.text("Mark your spot");

          displayActivityName.append(activityName);
          displayActivityRank.append("This activity is ranked " + activityRank);
          activityList.append([
            displayActivityName,
            displayActivityRank,
            activitySave
          ]);

          $("#activity-display").append(activityList);
        }
      }
    });
  });
}

function clear() {
  $("#flight-display").empty();
  $("#hotel-display").empty();
  $("#activity-display").empty();
}

$("#searchCriteria").on("click", function() {
  clear();
  buildQueryURLFlight();
  buildQueryURLSleep();
  findActivities();
});

var itineraryDiv = $("#right-block");

function appendToSomethingDiv() {
  itineraryDiv.prepend($(this).siblings());
  $(this, "button").hide();
  $(this, "card-body").hide();
}

// Store adventures under account name
$("#saveAdventure").on("click", function() {
  var customItinerary = $(this).siblings();
  var savedAdventures = [];
  var adventureInfo = {
    Destination: $("#adventureLocationInput").val(),
    Date: $("#startDateInput").val(),
    savedItinerary: customItinerary
  };
  savedAdventures.push(adventureInfo);
  console.warn("Adventure Added", savedAdventures);
  localStorage.setItem("currentAdventure", JSON.stringify(savedAdventures));
  console.log(savedAdventures[0].savedItinerary[0]);

  var addAdventure = savedAdventures[0].savedItinerary;

  console.log(addAdventure);
  viewAdventures();

  function viewAdventures() {
    var adventureName =
      savedAdventures[0].Destination + " " + savedAdventures[0].Date;

    for (var i = 0; i < addAdventure.length; i++) {
      var savedContainer = $("<div class='card'></div>");
      var savedContainerCardHeader = $("<div class='card-header'></div>");
      var savedActivityTitle = $("<h2 class='display-4'></h2>");

      savedActivityTitle.text(adventureName);
      savedContainerCardHeader.append(savedActivityTitle);
      savedContainer.append(savedContainerCardHeader);
    }
    for (var i = 0; i < addAdventure.length; i++) {
      var savedBody = $("<div></div>");
      var savedBodyContent = $("<div class='card-body' ></div>");
      savedBody.append(savedBodyContent);
      savedBodyContent.append(addAdventure[i]);
      savedContainer.append(savedBody);
    }
    var adventureAccordion = $("<div class='accordion' ></div>");
    adventureAccordion.append(savedContainer);

    $("#displayadventures").append(adventureAccordion);
  }
});

var retrieveUser = localStorage.getItem("accounts");
var renderUser = JSON.parse(retrieveUser);
var adventureKey = renderUser[0].Name + renderUser[0].Password;
