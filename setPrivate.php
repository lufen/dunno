<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'UPDATE pages set public=0 where id=:pageID';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_SESSION['pageID']);

$sth->execute ();
if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Failed'));
}else{
	echo json_encode (array ('ok'=>'OK'));
}
?>