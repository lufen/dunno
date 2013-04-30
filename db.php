<?php
// Make a php data object
try {
	$db = new PDO('mysql:host=129.242.219.39;dbname=dunno', 'dunno', 'dunno');
} catch (PDOException $e) {
    die ('Could not connect to server : ' . $e->getMessage());
}

?>
