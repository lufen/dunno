<?php
	require_once 'sessionStart.php';
	require "db.php";

	try{
		// Add user, then read back and update it with the encrypted one.
		$sql = 'UPDATE users SET email=:email WHERE id=:id';
		$sth = $db->prepare ($sql);
		$sth->bindValue (':email', $_GET['email']);
		$sth->bindValue (':id', $_SESSION['id']);
		$affected_rows = $sth->execute();
		if($affected_rows != 1){
			// Should only change for one user at the time
			echo json_encode (array ('message'=>'More than one row was affected by the update, no changes made.'));
			exit();
		}
		}catch (Exception $e){
			echo json_encode (array ('message'=>'Unknown error', 'ok'=>'NOTOK'));
			exit();
		}
	echo json_encode (array ('ok'=>'OK'));
?>