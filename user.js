$(document).ready(function() {
  $("#myModal").attr("data-background", "black");
  if (!Cookies.get("popup")) {
    $("#myModal").modal("show");
    Cookies.set("popup", "popped");
  }
});
