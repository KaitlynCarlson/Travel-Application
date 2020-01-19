// Create account on load modal
$(document).ready(function(event) {
  var userCreated = JSON.parse(localStorage.getItem("accounts"));
  console.log(userCreated);
  if (userCreated === null || undefined) {
    $("#myModal").modal("show");
  } else {
    $("#loggedin").append(userCreated[0].Name);
  }
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
