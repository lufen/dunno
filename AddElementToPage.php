<?php
require_once 'sessionStart.php';
require "db.php";
// Get number of elements already for this page
$sql = 'Select count(id) as number from elements where pageID=:pageID';
$sthOldValue = $db->prepare ($sql);
$sthOldValue->bindParam (':pageID', $_GET['pageID']);
$sthOldValue->execute ();
$row = $sthOldValue->fetch();

$sql = 'INSERT INTO elements (pageID,content,place)VALUES (:pageID,:content,:place)';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_GET['pageID']);
$sth->bindParam (':content', $_GET['text']);
$place = $row['number']+1;
$sth->bindParam (':place',$place);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	// Mark the file as published
	$sql = 'UPDATE files set published=1 where id = :id and userID=:userID';
	$sth = $db->prepare ($sql);
	$sth->bindParam (':id', $_GET['fileID']);
	$sth->bindParam (':userID', $_SESSION['id']);
	$sth->execute ();

	echo json_encode (array ('ok'=>'OK', 'id'=>$_SESSION['pageID']));
}
?>