function LoadpublicMenu () {
	$('#PublicMenu').hide();
	$.ajax({
		async:true,
		url: 'elementHandling/getPublicPages.php',
		cache: 'false',
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$("#page").append('<option value='+value["id"].toString()+' >'+value["title"]+'</option>');
			});
		}
	});
	$('#PublicMenu').load('elementHandling/publicPages.html');
	$("#PublicMenu").show();
}

function LoadDefaultMainPage () {
	// Show the new user dialog.
	$('#userInt').hide();	
	$('#Main').load('main.html');
	hideEditMenu();
	$('#sidebar').hide();
	$('#LoginMenu').load('topMenuUNloggedin.html');
	LoadpublicMenu();
	document.title = "Web page making system";
}

function LoadLoggedInMainPage () {
	// Show the new user dialog.	
	$('#Main').load('loggedInMain.html');
	$('#LoginMenu').load('topMenuLoggedIn.html');
	hideEditMenu();
	getMYPages();
	LoadpublicMenu();
	document.title = "Web page making system";
}

function changeInfoDialog () {
	$("#changeEmail").dialog({
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

function updateInfo(form){
	if (form.email.value!=form.confirmation.value) {
		alert ("E-mail addresses has to match");
		form.pwd.focus();
	}
	$.ajax({
		async:true,
		url: 'updateInformation.php',
		type: 'get',
		data: {'email': form.email.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok = 'OK'){
				alert ("E-mail address changed");
			} else {
				alert (data.message);
			}
		}
	})
	$('#changeEmail').dialog('close');
}
