<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'UPDATE pages set public=1 where id=:pageID';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_SESSION['pageID']);
session_write_close();
$sth->execute ();
if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Failed'));
}else{
	echo json_encode (array ('ok'=>'OK'));
}
?>