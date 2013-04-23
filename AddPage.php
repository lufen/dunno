<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'INSERT INTO pages (userID,title)VALUES (:userID,:title)';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->bindParam (':title', $_GET['title']);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	echo json_encode (array ('ok'=>'OK'));
}
?>