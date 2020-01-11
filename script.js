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

findActivities();
