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
function hideEditMenu(){
	// Hide edit menu, for those pages you can not edit.
	$('#EditMenu').hide();
}
function LoadEditMenu(){
	$('#EditMenu').load('elementHandling/editMenu.html');
	$.ajax({
		async:true,
		url: 'elementHandling/getPagePrivateStatus.php',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.pub == 'yes') {
				$.get('elementHandling/AddSetPrivateButton.html', function(data) {
    				$("#EditMenu").append(data);
				});;
			}else{
				$.get('elementHandling/AddSetPublicButton.html', function(data) {
    				$("#EditMenu").append(data);
				});;
			}
		}
	});
	$('#EditMenu').show();
}

function getMYPages() {
	$.ajax({
		async:true,
		url: 'elementHandling/getMyPages.php',
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

function getAndSetTitle(id){
	$.ajax({
		url: 'elementHandling/getTitle.php',
		type: 'get',
		data: {'id': id},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			document.title = data.title;
		}
	});
}

function openPage(id) {
	// Open page, and allow for editing
	$.ajax({
		async:true,
		url: 'elementHandling/openPage.php',
		type: 'get',
		data: {'id': id},
		success: function (tmp) {
			$('#Main').empty();
			$('#Main').html('<ul id="sortable">');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#sortable ').append('<li class="ui-state-default" id="page_'+value['id']+'">'+value["content"]+'</li>');
				
				$("#sortable ").sortable({
					placeholder: "ui-sortable-placeholder",
					update: function(event, ui) {
        				$.post("elementHandling/UpdatePosition.php", { pages: $('#sortable ').sortable('serialize') } );
    				},    
				}).disableSelection();
			});
			LoadEditMenu();
			getAndSetTitle(id);
		}
	});
};

function openPublicPage(form) {
	// Open page, but not allow for editing
	$.ajax({
		async:true,
		url: 'elementHandling/openPublicPage.php',
		type: 'get',
		data: {'id': form.page.value},
		success: function (tmp) {
			hideEditMenu();
			$('#Main').html('');
			var jsonData = jQuery.parseJSON(tmp);
			$.each(jsonData, function (index, value) {
				$('#Main').append('<div class=\'elem\' id='+value['id']+'>'+value["content"]+'</div>');
			});
			getAndSetTitle(form.page.value);
		}
	});
};

function addPage(form) {
	$.ajax({
		async:true,
		url: 'elementHandling/AddPage.php',
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
		url: 'elementHandling/setPrivate.php',
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
		url: 'elementHandling/setPublic.php',
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
		url: 'elementHandling/AddElement.php',
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
		url: 'elementHandling/AddElement.php',
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
		url: 'elementHandling/addNewTextElement.html',
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