<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'SELECT public FROM pages WHERE id=:pageID';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_SESSION['pageID']);
session_write_close();
$sth->execute ();

$row = $row = $sth->fetch();
if($row['public']==1){
	echo json_encode (array ('pub'=>'yes'));
}else{
	echo json_encode (array ('pub'=>'no'));
}
?>