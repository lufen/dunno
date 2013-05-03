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
