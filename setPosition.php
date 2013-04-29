<?php
require_once 'sessionStart.php';
require "db.php";

$sql = 'UPDATE elements e join pages p on e.pageID=p.id set e.place=:place where e.id=:id and p.userID=:userID';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->bindParam (':place', $_GET['place']);
$sth->bindParam (':id',$_GET['id']);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	echo json_encode (array ('ok'=>'OK', 'id'=>$_SESSION['pageID']));
}
?>