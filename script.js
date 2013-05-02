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

function OpenFilesDialog(){
	$('#EditMenu').hide();
	// Open file storage
	$('#Main').load('fileStorage.html');
	// Get list of users folders
	$.ajax({
		async:true,
		url: 'getFolders.php',
		cache: 'false',
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$("#MyFiles").append("<H1>My folders</H1>");
			$.each(jsonData, function (index, value) {
				$("#MyFiles").append('<a href="javascript:getFilesInFolder('+value["id"]+')">'+value["name"]+'</a><br/>');
				$("#foldersCreated").append('<option value='+value["id"]+' >'+value["name"]+'</option>');
			});
		}
	});
	$.ajax({
		async:true,
		url: 'getMyPages.php',
		cache: 'false',
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$("#pageToPublishTo").append('<option value='+value["id"].toString()+' >'+value["title"]+'</option>');
			});
		}
	});
}

function getFilesInFolder(id){
	// Get the list of files inside a folder
	$.ajax({
		async:true,
		url: 'getFilesInFolder.php',
		cache: 'false',
		type: 'get',
		data: { id: id},
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				link = '<a href="downloadFile.php?id='+value["id"]+'">Download</a>';
				publish = '<a href="javascript:publishFileDialog('+value['id']+');">Publish</a>';
				$("#FilesInFolderColumn1").append(value['name']);
				$("#FilesInFolderColumn2").append(value['mine']);
				$("#FilesInFolderColumn3").append(value['size']);
				$("#FilesInFolderColumn4").append(link);
				$("#FilesInFolderColumn5").append(publish);
			});
		}
	});
}

function publishFileDialog (id) {
	$("#fileID").val(id);
	// Show the login dialog.
   $("#publish-form").dialog({
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

function publishFile(form){
	$.ajax({
		async:false,
		url: 'getFileName.php',
		type: 'get',
		data: {'id': form.fileID.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			link = '<a href="downloadFile.php?id='+form.fileID.value+'">Download '+data.name+'</a>';
		}
	});
	$.ajax({
		async:false,
		url: 'AddElementToPage.php',
		type: 'get',
		data: {'text': link, 'pageID': form.pageToPublishTo.value, 'fileID': form.fileID.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				openPage(data.id);
			} else {
				alert (data.message);
			}
		}
	});
	$("#publish-form").dialog("close");
}

function AddFolderDialog () {
	// Show the login dialog.
   $("#folder-form").dialog({
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

function UploadFileDialog () {
	// Show the login dialog.
   $("#file-form").dialog({
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

function AddFolder(form){
	$.ajax({
		async:true,
		url: 'addFolder.php',
		type: 'get',
		data: {'folderName': form.folderName.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				alert ("Folder added");
			} else {
				alert (data.message);
			}
		}
	});
	OpenFilesDialog();
	$("#folder-form").dialog("close");
}



function LoadpublicMenu () {
	$('#PublicMenu').hide();
	$.ajax({
		async:true,
		url: 'getPublicPages.php',
		cache: 'false',
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$("#page").append('<option value='+value["id"].toString()+' >'+value["title"]+'</option>');
			});
		}
	});
	$('#PublicMenu').load('publicPages.html');
	$("#PublicMenu").show();
}

// Show the element asked for, and hide the rest.
function toogleAddText(){
	$('#iframePage').hide();
	$('#Addfile').hide();
	$('#textElement').toggle();  
}

function toogleAddIframe(){
	$('#textElement').hide();
	$('#Addfile').hide();
	$('#iframePage').toggle();  
}
function toogleAddFile(){
	$('#textElement').hide();
	$('#iframePage').hide();
	$('#Addfile').toggle();  
}

function AmILoggedIn() {
	// Return OK if the user is logged in.
	$.ajax({
		async:true,
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
	$('#userInt').hide();	
	$('#Main').load('main.html');
	$('#EditMenu').hide();
	$('#sidebar').hide();
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
	// Hide edit menu, for those pages you can not edit.
	$('#EditMenu').hide();
}
function LoadEditMenu(){
	$('#EditMenu').load('editMenu.html');
	$.ajax({
		async:true,
		url: 'getPagePrivateStatus.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.pub == 'yes') {
				$.get('AddSetPrivateButton.html', function(data) {
    				$("#EditMenu").append(data);
				});;
			}else{
				$.get('AddSetPublicButton.html', function(data) {
    				$("#EditMenu").append(data);
				});;
			}
		}
	});
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

function login(form) {
	$.ajax({
		async:true,
		url: 'login.php',
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

function logout() {
	$.ajax({
		async:true,
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
		async:true,
		url: 'getMyPages.php',
		success: function (tmp) {
			$('#sidebar').html('<P> My pages: </P>');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#sidebar').append('<a href="javascript:openPage('+value["id"].toString()+')">'+value["title"]+'</a><br/>');
			});
		}
	});
	$('#sidebar').show();
};

function openPage(id) {
	// Open page, and allow for editing
	$.ajax({
		async:true,
		url: 'openPage.php',
		type: 'get',
		data: {'id': id},
		success: function (tmp) {
			$('#Main').html('');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$.ajax({
					url: 'setPlacement.html',
					success: function (data) {
					$('#Main').append('<div class=\'elem\' id='+value['id']+'>'+value["content"]+data+'<input type="hidden" name="id" value="'+value['id']+'">'+'<input type="number" id="place" min=0 value='+value['place']+'></form>');
				}
				});
				$('#Main').append('</div>');
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
	// Open page, but not allow for editing
	$.ajax({
		async:true,
		url: 'openPublicPage.php',
		type: 'get',
		data: {'id': form.page.value},
		success: function (tmp) {
			hideEditMenu();
			$('#Main').html('');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#Main').append('<div class=\'elem\' id='+value['id']+'>'+value["content"]+'</div>');
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
		async:true,
		url: 'AddPage.php',
		type: 'get',
		data: {'title': form.title.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				getMYPages();
				LoadEditMenu();
			} else {
				alert (data.message);
			}
		}
	});
	$("#addPage-form").dialog("close");
};

function setPrivate() {
	$.ajax({
		async:true,
		url: 'setPrivate.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				alert ("Page is now setPrivate");
				LoadpublicMenu();
				LoadEditMenu();
			} else {
				alert (data.message);
			}
		}
	});
};

function setPublic() {
	$.ajax({
		async:true,
		url: 'setPublic.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok == 'OK') {
				alert ("Page is now public");
				LoadpublicMenu();
				LoadEditMenu();
			} else {
				alert (data.message);
			}
		}
	});
};

function addTextElement(form) {
	$.ajax({
		async:true,
		url: 'AddElement.php',
		type: 'get',
		data: {'text': tinyMCE.activeEditor.getContent()},
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


function addIframeElement(form) {
	url = '<iframe src="'+form.URL.value+'"></iframe>';
	$.ajax({
		async:true,
		url: 'AddElement.php',
		type: 'get',
		data: {'text': url},
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

function SetPlacement(form){
	// Update the placement of the element
	$.ajax({
	async:true,
	url: 'setPosition.php',
	type: 'get',
	data: {'id': form.id.value, 'place': form.place.value},
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
   $("#addPage-form").dialog({
	autoOpen: false,
	height: 250,
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
};

function OpenAddElementDialog () {
	// Show the new element dialog.	
		$.ajax({
		async:true,
		url: 'addNewTextElement.html',
		success: function (data) {
			$('#Main').html(data);
			tinymce.init({
				language : 'en', 
			    selector: "textarea",
    			theme: "modern",

				// General options
				plugins :"pagebreak,layer,table,save,insertdatetime,preview,searchreplace,contextmenu,paste,fullscreen,noneditable,visualchars,nonbreaking",

				// Theme options
				theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,|,forecolor,backcolor",
				theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,cleanup,removeformat,help,code,|,visualchars,nonbreaking,visualaid,|,insertdate,inserttime",
				theme_advanced_buttons3 : "tablecontrols,|,sub,sup,|,charmap,|,fullscreen,|,cite,abbr,acronym,del,ins",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,
			
				spellchecker_languages : "Norwegian=no,+English=en",
			});
		}
	});
};



