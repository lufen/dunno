<?php
/**
 * Script used to store files saved using standard file upload dialog
 */
	require_once 'sessionStart.php';
	require_once 'db.php';
	
	// SQL statement to insert a new file into the database
	$sql = 'INSERT INTO files (folder, userID, name, mime,content, size)
	        VALUES (?, ?, ?, ?, ?, ?)';

	if (is_uploaded_file($_FILES['file']['tmp_name'])) {			// Only save if an actual file is uploaded
		$content = file_get_contents($_FILES['file']['tmp_name']);
		$name = $_FILES['file']['name'];
		$mime = $_FILES['file']['type'];
		$size = $_FILES['file']['size'];
		$sth = $db->prepare ($sql);
		// Save the file
		$sth->execute (array ($_POST['foldersCreated'], $_SESSION['id'], $name, $mime, $content, $size));
		print_r ($sth->errorInfo());		// For debuging purposes
	} else	// Give error message if no file uploaded
		die ('<script type="text\javascript">\nalert ("Ingen fil lastet opp!!!");\n</script>');
?><script type="text/javascript">
// Call the script in the window that owns this iframe
window.parent.window.fileUploaded();
$('#file-form').dialog('close');
//window.location = 'db.php';
</script>