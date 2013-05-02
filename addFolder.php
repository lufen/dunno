<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'INSERT INTO folders (name,userID)VALUES (:name,:userID)';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->bindParam (':name', $_GET['folderName']);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	echo json_encode (array ('ok'=>'OK'));
}
?>