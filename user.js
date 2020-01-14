$(document).ready(function() {
  $("#myModal").css("background-color", "darkslategrey");
  if (!Cookies.get("popup")) {
    $("#myModal").modal("show");
    Cookies.set("popup", "popped");
  }
});
