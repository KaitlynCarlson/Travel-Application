$("#user-account").on("click", function() {
  var localAccounts = [];
  const newUser = function(e) {
    e.preventDefault();
    var addUser = {
      Name: $("#userName").val(),
      Password: "#userPassword".val()
    };
    $(localAccounts).push($(addUser));
  };

  console.warn("added", localAccounts);

  //   var test = $("#bottom-empty");
  //   test.append(JSON.stringify(localAccounts));
});

$(document).ready(function() {
  $("#myModal").css("background-color", "darkslategrey");
  if (!Cookies.get("popup")) {
    $("#myModal").modal("show");
    Cookies.set("popup", "popped");
  }
});
