<?php
	require_once '../sessionStart.php';
	session_unset();
	echo json_encode (array ('ok'=>'OK'));
?>
