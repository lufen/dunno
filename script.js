function newUserDialog () {
	// Show the new user dialog.	
	$('#Main').load('newUser.html');
}
function loginDialog () {
	// Show the new user dialog.	
	$('#Main').load('login.html');
}

function newUser (form) {
 if (form.password1.value!=form.password.value) {
		alert ("Passwords has to match");
		form.pwd.focus();
	}
	$.ajax({
		url: 'registerNewUser.php',
		type: 'get',
		data: { email: form.email.value, password: form.password.value },
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok=="OK") {
				$.ajax({
					url: 'login.php',
					type: 'get',
					data: {'email': form.email.value, 'password': form.password.value},
					success: function (tmp) {
						$('#Main').load('main.html');
						$('#LoginMenu').html('Hei');
					}
				});
			} else {
				alert (data.message);
			}
		}
	});
}

function login(form) {
	$.ajax({
		url: 'login.php',
		type: 'get',
		data: {'email': form.email.value, 'password': form.password.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				$('#Main').load('main.html');
				$('#LoginMenu').load('topMenuLoggedIn.html');
			} else {
				alert (data.message);
			}
		}
	});
};

function logout() {
	$.ajax({
		url: 'logout.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				$('#LoginMenu').load('topMenuUNloggedin.html');
			}
		}
	});
};


function AmILoggedIn() {
	$.ajax({
		url: 'isLoggedIn.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				$('#LoginMenu').load('topMenuLoggedIn.html');
				$('#Main').load('main.html');
			} else {
				$('#LoginMenu').load('topMenuUNloggedin.html');
			}
		}
	});
};