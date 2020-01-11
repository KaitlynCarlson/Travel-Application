$(document).ready(function() {
  function buildQueryURLFlight() {
    var adventureLocation = $("#adventureLocationInput").val();
    // console.log(adventureLocation);
    var startFlightDate = $("#startDateInput").val();
    var endFlightDate = $("#endDateInput").val();
    var userLocation = $("#userLocationInput").val();
    var cityId = "";

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
      console.log(cityId);
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
      console.log(userCityId);

      var flightParameters = {
        async: true,
        crossDomain: true,
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
        method: "POST",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d",
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          inboundDate: "2020-02-10",
          cabinClass: "business",
          children: "0",
          infants: "0",
          country: "US",
          currency: "USD",
          locale: "en-US",
          originPlace: userCityId,
          destinationPlace: cityId,
          outboundDate: "2020-02-01",
          adults: "1"
        }
      };

      $.ajax(flightParameters).done(function(test) {
        console.log(test);
      });
      var sessionResults = {
        async: true,
        crossDomain: true,
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/d88a69b6-59fb-43bd-b1de-e986709ad487?pageIndex=0&pageSize=10",
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "54fe8ad1femshf879567efc0115ap19ca9fjsn5da4b88c683d"
        }
      };

      $.ajax(sessionResults).done(function(test) {
        console.log(test);
        var key = test.SessionKey;
        console.log(key);
      });
    });
  }

  function buildQueryURLRest() {
    var travelBudget = $("#travelBudget").val();
    // console.log(travelBudget);
    var sleepBudget = $("#sleepBudget").val();
    // console.log(sleepBudget);
    var startRestDate = $("#startDateInput").val();
    var endRestDate = $("#endDateInput").val();
    // console.log(startRestDate);
    // console.log(endRestDate);
  }

  $("#searchCriteria").on("click", function() {
    buildQueryURLFlight();
    buildQueryURLRest();
  });
});
