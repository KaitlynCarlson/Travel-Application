$(document).ready(function() {
  $("#myModal").css("background-color", "darkslategrey");
  if (!Cookies.get("popup")) {
    $("#myModal").modal("show");
    Cookies.set("popup", "popped");
  }

  $("#user-account").on("click", function() {
    var userName = $("#userName").val();
    var userPassword = $("#userPassword").val();
    console.log(userName);
    console.log(userPassword);
  });
});
