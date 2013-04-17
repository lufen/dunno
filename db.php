<?php
// Make a php data object
try {
	$db = new PDO('mysql:host=moosecloud.net;dbname=dunno', 'gfs', '');
} catch (PDOException $e) {
    die ('Could not connect to server : ' . $e->getMessage());
}

?>
