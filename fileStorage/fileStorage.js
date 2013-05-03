function parseSize(size) {
	// http://blog.jbstrickler.com/2011/02/bytes-to-a-human-readable-string/
	suffixes = ["Bytes", "KB", "MB"];
	for (place=0;size >= 1024;place++){
		size = size / 1024;
	}

	return Math.round(size * 10) / 10 + " " + suffixes[place];
}

// Get the list of files inside a folder
function getFilesInFolder(id){
	$.ajax({
		async:true,
		url: 'fileStorage/getFilesInFolder.php',
		cache: 'false',
		type: 'get',
		data: { id: id},
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				link = '<a href="fileStorage/downloadFile.php?id='+value["id"]+'">Download</a>';
				publish = '<a href="javascript:publishFileDialog('+value['id']+');">Publish</a>';
				$("#FilesInFolderColumn1").append(value['name']+"<br/><br/>");
				$("#FilesInFolderColumn2").append(value['mime']+"<br/><br/>");
				$("#FilesInFolderColumn3").append(parseSize(value['size'])+"<br/><br/>");
				$("#FilesInFolderColumn4").append(link+"<br/>");
				$("#FilesInFolderColumn5").append(publish+"<br/>");
			});
		}
	});
}

// Publish a given file to the page the user wants to
function publishFile(form){
	$.ajax({
		async:false,
		url: 'fileStorage/getFileName.php',
		type: 'get',
		data: {'id': form.fileID.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			link = '<a href="fileStorage/downloadFile.php?id='+form.fileID.value+'">Download '+data.name+'</a>';
		}
	});
	$.ajax({
		async:false,
		url: 'elementHandling/AddElementToPage.php',
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

// Make a new folder
function AddFolder(form){
	$.ajax({
		async:true,
		url: 'fileStorage/addFolder.php',
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


// Dialogs 
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

function OpenFilesDialog(){
	hideEditMenu();
	// Open file storage
	$('#Main').load('fileStorage/fileStorage.html');
	// Get list of users folders
	$.ajax({
		async:true,
		url: 'fileStorage/getFolders.php',
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
	// Make ready the list of pages, if user wants to publish a file
	$.ajax({
		async:true,
		url: 'elementHandling/getMyPages.php',
		cache: 'false',
		success: function (tmp) {
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$("#pageToPublishTo").append('<option value='+value["id"].toString()+' >'+value["title"]+'</option>');
			});
		}
	});
}
