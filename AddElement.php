<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'INSERT INTO elements (pageID,content,place)VALUES (:pageID,:content,:place)';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_SESSION['pageID']);
$sth->bindParam (':content', $_GET['text']);
$place = 1;
$sth->bindParam (':place',$place);
$sth->execute ();

if($sth->rowCount() == 0){
	echo json_encode (array ('message'=>'Damn you'));
}else{
	echo json_encode (array ('ok'=>'OK', 'id'=>$_SESSION['pageID']));
}
?>