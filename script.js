$(document).ready(function() {
  function buildQueryURLFlight() {
    var adventureLocation = $("#locationInput").val();
    // console.log(adventureLocation);
    var startFlightDate = $("#startDateInput").val();
    var endFlightDate = $("#endDateInput").val();
    // console.log(startFlightDate);
    // console.log(endFlightDate);
    var locations = {
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

    $.ajax(locations).done(function(response) {
      console.log(response);
      var location = response.Places[0].PlaceName;

      console.log(location);
      var cityId = response.Places[0].CityId;
      if (location === adventureLocation) {
        console.log(cityId);
      }
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
