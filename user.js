// Create account on load modal
$(document).ready(function(event) {
  // $("#myModal").modal("show");
  event.preventDefault();
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
  $("#loggedin").append(userName);
  e.preventDefault();
});
