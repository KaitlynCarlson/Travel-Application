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

  $("#searchCriteria").on("click", function() {
    buildQueryURLFlight();
    buildQueryURLRest();
  });
});
