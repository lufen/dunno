<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'INSERT INTO pages (userID,title,public)VALUES (:userID,:title,:public)';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
session_write_close();
$sth->bindParam (':title', $_GET['title']);
$pub = 0;
$sth->bindParam (':public', $pub);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	echo json_encode (array ('ok'=>'OK'));
}
?>