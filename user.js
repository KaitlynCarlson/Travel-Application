// Create account on load modal
$(document).ready(function() {
  // $("#adventurebookmodal").css("background-color", "	#082567");
  // $("#myModal").css("background-color", "	#082567");
  $("#myModal").modal("show");

  // $("#adventureBook").css("box-shadow", "0px 0px 5px #ddd");
  // $("#adventureBook").on("click", function() {
  //   $("#adventureBook").css("box-shadow", "0px 0px 0px");
  // });
});

// Store account on create account button click
$("#user-account").on("click", function(e) {
  var localAccounts = [];
  var userName = $("#userName").val();
  var userPassword = $("#userPassword").val();

  var addUser = {
    Name: userName,
    Password: userPassword
  };
  localAccounts.push(addUser);

  console.warn("added", localAccounts);
  localStorage.setItem("accounts", JSON.stringify(localAccounts));
  e.preventDefault();
});
