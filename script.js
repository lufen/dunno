function newUserDialog () {
	// Show the new user dialog.	
	$('#Main').load('newUser.html');
}
function loginDialog () {
	// Show the new user dialog.	
	$('#Main').load('login.html');
}

function LoadDefaultMainPage () {
	// Show the new user dialog.	
	$('#Main').load('main.html');
	$('#sidebar').html('<P> Sidebar: </P>');
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
						$('#Main').load('loggedInMain.html');
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
				getMYPages();
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
				LoadDefaultMainPage();
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

function getMYPages() {
	$.ajax({
		url: 'getMyPages.php',
		success: function (tmp) {
			$('#sidebar').html('<P> Sidebar: </P>');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#sidebar').append('<a href="javascript:openPage('+value["id"].toString()+')">'+value["title"]+'</a><br/>');
			});
		}
	});
};

function openPage(id) {
	$.ajax({
		url: 'openPage.php',
		type: 'get',
		data: {'id': id},
		success: function (tmp) {
			$('#Main').html('<P> Main: </P>');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
			$('#Main').append('<div id=elem>'+value["content"]+'</div>');
			});
			
		}
	});
};

function addPage(form) {
	$.ajax({
		url: 'AddPage.php',
		type: 'get',
		data: {'title': form.title.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				getMYPages();
			} else {
				alert (data.message);
			}
			
		}
	});
};

function OpenaddPageDialog () {
	// Show the new user dialog.	
	$('#Main').load('AddNewPage.html');
}


