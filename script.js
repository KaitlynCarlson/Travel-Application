function buildQueryURLFlight() {
  var adventureLocation = $("#adventureLocationInput").val();
  var userLocation = $("#userLocationInput").val();
  var cityId = "";
  var startDate = $("#startDateInput").val();
  var endDate = $("#endDateInput").val();
  // console.log(adventureLocation);
  // console.log(userLocation);
  // console.log(startFlightDate);
  // console.log(endFlightDate);
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

    cityId = adventure.Places[0].CityId;
  });

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
  $.ajax(userInfo).done(function(userresponse) {
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
        "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
      }
    };
    $.ajax(flightSearch).then(function(adventureFlight) {
      console.log(adventureFlight);
      var fly = adventureFlight.Quotes;
      var companies = adventureFlight.Carriers;
      console.log(companies);
      console.log(fly);
      // var trying = "";

      searchFlightPriceAndProvider(fly);
      function searchFlightPriceAndProvider() {
        for (var i = 0; i <= fly.length; ++i) {
          var flightPrices = fly[i].MinPrice;
          var flightsQuotedProviders = fly[i].OutboundLeg.CarrierIds;
          // console.log(providerId);
          var displayFlightCard = $('<div class="card-body"></div>');
          var displayFlightTitle = $('<h4 class="card-title"></h4> ');
          var displayFlightBody = $('<p class="card-text"></p> ');

          displayFlightTitle.append(
            "Flights found for " + startDate + " starting at "
          );
          displayFlightBody.append(
            "$ " + flightPrices + " from " + flightsQuotedProviders
          );

          displayFlightCard.append([displayFlightTitle, displayFlightBody]);
          $("#bottom-empty").append(displayFlightCard);
        }
      }
    });
  });
}

function buildQueryURLSleep() {
  var adventureStartLocationHotel = $("#userLocationInput").val();
  var adventureLocationHotel = $("#adventureLocationInput").val();
  // var hotelBudget = $("#sleepBudget").val();
  var checkIn = $("#startDateInput").val();
  // console.log(hotelBudget);
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
      "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
    }
  };
  $.ajax(adventureHotelLocation).done(function(hotelId) {
    console.log(hotelId);
    // console.log(sleepBuget);
    var hotelLocationId = hotelId.data[0].result_object.location_id;
    var adventureHotelsAvailable = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&subcategory=hotel%252Cbb%252Cspecialty&pricesmax=" +
        // sleepBudget +
        "&hotel_class=1%252C2%252C3&currency=USD&limit=30&checkin=" +
        checkIn +
        "&order=asc&lang=en_US&sort=recommended&nights=1&location_id=" +
        hotelLocationId +
        "&adults=1&rooms=1",
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
      }
    };

    $.ajax(adventureHotelsAvailable).done(function(hotelInfo) {
      console.log(hotelInfo);
      var adventureHotelOptions = hotelInfo.data;
      for (var i = 0; i <= 4; ++i) {
        var hotelName = adventureHotelOptions[i].name;
        var hotelRating = adventureHotelOptions[i].rating;
        var priceRange = adventureHotelOptions[i].price;
        var image = adventureHotelOptions[i].photo.images.thumbnail.url;
        var hotelRanking = adventureHotelOptions[i].ranking;
        var displayHotelInfo = $('<div class="card-body"></div>');
        var displayHotelTitle = $('<h4 class="card-title"></h4> ');
        var displayHotelBody = $('<p class="card-text"></p> ');
        var hotelImage = $("<img>");
        $(hotelImage).attr("src", image);
        var saveHotel = $("<button class = btn-outline-dark>");
        saveHotel.text("Mark Your Spot");
        displayHotelTitle.prepend(hotelImage);
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
        $("#bottom-empty").append(displayHotelInfo);
      }
    });
  });
}
//ACTIVE SELECTOR
var userDestination = $("#adventureLocationInput").val();

//TEST SELECTOR
// var userDestination = "Seattle";

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
    console.log("This is the destination ID " + destinationID);

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
      console.log(activityResponse);
      var activityChoice = activityResponse.data;

      appendActivities(activityChoice);

      function appendActivities() {
        for (var i = 0; i <= 4; i++) {
          var activityName = activityChoice[i].name;
          var activityRank = activityChoice[i].ranking;

          var activityList = $('<div class="card-body"></div>');
          var displayActivityName = $('<h4 class="card-title"></h4> ');
          var displayActivityRank = $('<p class="card-text"></p> ');

          displayActivityName.append(activityName);
          displayActivityRank.append(
            "This activity is considered " + activityRank
          );
          activityList.append([displayActivityName, displayActivityRank]);
          $("#bottom-empty").append(activityList);
        }
      }
    });
  });
}
function clear() {
  $("#bottom-empty").empty();
}
$("#searchCriteria").on("click", function() {
  clear();
  buildQueryURLFlight();
  buildQueryURLSleep();
  findActivities();
});
