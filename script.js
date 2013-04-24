function newUserDialog () {
	// Show the new user dialog.	
	$('#Main').load('newUser.html');
}
function loginDialog () {
	// Show the new user dialog.	
	$('#Main').load('login.html');
}

function LoadpublicMenu () {
	
	$.ajax({
	url: 'getPublicPages.php',
	success: function (tmp) {
		var jsonData = jQuery.parseJSON(tmp);
		$.each(jsonData, function (index, value) {
			$("#page").append('<option value='+value["id"].toString()+' >'+value["title"]+'</option>');
		});
	}
});
	$('#PublicMenu').load('publicPages.html');
	$("#PublicMenu").hide().fadeIn('fast');
}

function AmILoggedIn() {
	$.ajax({
		url: 'isLoggedIn.php',
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

function LoadDefaultMainPage () {
	// Show the new user dialog.	
	$('#Main').load('main.html');
	$('#EditMenu').hide();
	$('#sidebar').html('<P> My pages: </P>');
	$('#LoginMenu').load('topMenuUNloggedin.html');
	LoadpublicMenu();
	document.title = "Web page making system";
	 
}

function LoadLoggedInMainPage () {
	// Show the new user dialog.	
	$('#Main').load('loggedInMain.html');
	$('#LoginMenu').load('topMenuLoggedIn.html');
	$('#EditMenu').hide();
	getMYPages();
	LoadpublicMenu();
	document.title = "Web page making system";
}

function hideEditMenu(){
	$('#EditMenu').hide();
}
function LoadEditMenu(){
	$('#EditMenu').load('editMenu.html');
	$('#EditMenu').show();
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
};

function login(form) {
	$.ajax({
		url: 'login.php',
		type: 'get',
		data: {'email': form.email.value, 'password': form.password.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				$('#Main').load('loggedInMain.html');
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



function getMYPages() {
	$.ajax({
		url: 'getMyPages.php',
		success: function (tmp) {
			$('#sidebar').html('<P> My pages: </P>');
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
			LoadEditMenu();
			$.ajax({
				url: 'getTitle.php',
				type: 'get',
				data: {'id': id},
				success: function (tmp) {
					data = eval ('('+tmp+')');
					document.title = data.title;
				}
			});
		}
	});
};

function openPublicPage(form) {
	$.ajax({
		url: 'openPublicPage.php',
		type: 'get',
		data: {'id': form.page.value},
		success: function (tmp) {
			hideEditMenu();
			$('#Main').html('<P> Main: </P>');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#Main').append('<div id=elem>'+value["content"]+'</div>');
			});
			$.ajax({
				url: 'getTitle.php',
				type: 'get',
				data: {'id': form.page.value},
				success: function (tmp) {
					data = eval ('('+tmp+')');
					document.title = data.title;
				}
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

function addElement(form) {
	$.ajax({
		url: 'AddElement.php',
		type: 'get',
		data: {'text': form.text.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				openPage(data.id);
			} else {
				alert (data.message);
			}
			
		}
	});
};

function OpenaddPageDialog () {
	// Show the new page dialog.	
	$('#Main').load('AddNewPage.html');
};

function OpenAddElementDialog () {
	// Show the new element dialog.	
	$('#Main').load('addNewTextElement.html');
};



