$("#user-account").on("click", function(e) {
  var userName = $("#userName").val();
  var userPassword = $("#userPassword").val();
  var localAccounts = [];

  var addUser = {
    Name: userName,
    Password: userPassword
  };
  localAccounts.push(addUser);

  console.warn("added", localAccounts);
  localStorage.setItem("accounts", localAccounts);
  e.preventDefault();

  console.log(localAccounts);
  $("#loggedin").append(userName);
});

$(document).ready(function() {
  $("#myModal").css("background-color", "darkslategrey");
  $("#myModal").modal("show");
});
