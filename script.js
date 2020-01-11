// <<<<<<< HEAD
// =======
$(document).ready(function() {
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
      console.log(adventure);
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
      var flightQuote = {
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

      $.ajax(flightQuote).done(function(flight) {
        console.log(flight);
      });
    });
  }

  function buildQueryURLRest() {
    var restStartLocation = $("#userLocationInput").val();
    var restEndLocation = $("#adventureLocationInput").val();
    var travelBudget = $("#travelBudget").val();
    // console.log(travelBudget);
    var sleepBudget = $("#sleepBudget").val();
    // console.log(sleepBudget);
    console.log(restEndLocation);
    console.log(restStartLocation);
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
            var displayActivityName = $('<h5 class="card-title"></h5> ');
            var displayActivityRank = $(
              '<p class="card-text" id="card-humidity"></p> '
            );

            displayActivityName.append(activityName);
            displayActivityRank.append(
              "This activity is considered " + activityRank
            );
            activityList.append([displayActivityName, displayActivityRank]);
            $("body").append(activityList);
          }
        }
      });
    });
  }

  $("#searchCriteria").on("click", function() {
    buildQueryURLFlight();
    buildQueryURLRest();
    findActivities();
  });
});
