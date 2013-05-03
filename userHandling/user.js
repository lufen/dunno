// Create a new user
function newUser (form) {
 if (form.password1.value!=form.password.value) {
		alert ("Passwords has to match");
		form.pwd.focus();
	}
	$.ajax({
		url: 'userHandling/registerNewUser.php',
		type: 'get',
		data: { email: form.email.value, password: form.password.value },
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok=="OK") {
				$.ajax({
					async:true,
					url: 'login.php',
					type: 'get',
					data: {'email': form.email.value, 'password': form.password.value},
					success: function (tmp) {
						LoadLoggedInMainPage();
					}
				});
			} else {
				alert (data.message);
			}
		}
	});
	$("#register-form").dialog("close");
};

// Login
function login(form) {
	$.ajax({
		async:true,
		url: 'userHandling/login.php',
		type: 'get',
		data: {'email': form.email.value, 'password': form.password.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				LoadLoggedInMainPage();
			} else {
				alert (data.message);
			}
		}
	});
	$("#login-form").dialog("close");
};

// Log a user out
function logout() {
	$.ajax({
		async:true,
		url: 'userHandling/logout.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				$('#LoginMenu').load('topMenuUNloggedin.html');
				LoadDefaultMainPage();
			}
		}
	});
};

// Return OK if the user is logged in.
function AmILoggedIn() {
	$.ajax({
		async:true,
		url: 'userHandling/isLoggedIn.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				LoadLoggedInMainPage();
			} else {
				LoadDefaultMainPage();
			}
		}
	});
};

// Dialogs
function newUserDialog () {
	// Show the new user dialog.	
	$("#register-form").dialog({
		autoOpen: false,
		height: 350,
		width: 350,
		modal: true,
		buttons: [
			{
				text: "Close",
				click: function() {
				$( this ).dialog( "close" );
				}
			}
		]
	}).dialog("open");
}

function loginDialog () {
	// Show the login dialog.
   $("#login-form").dialog({
		autoOpen: false,
		height: 350,
		width: 350,
		modal: true,
		buttons: [
			{
				text: "Close",
				click: function() {
				$( this ).dialog( "close" );
				}
			}
		]
      }).dialog("open");
}