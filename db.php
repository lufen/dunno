<?php
// Make a php data object
try {
	$db = new PDO('mysql:host=moosecloud.net;dbname=dunno', 'dunno', 'dunno');
} catch (PDOException $e) {
    die ('Could not connect to server : ' . $e->getMessage());
}

?>
