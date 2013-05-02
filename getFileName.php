<?php
require "db.php";
require_once 'sessionStart.php';
$sql = 'SELECT name FROM files WHERE id=:id and userID=:userID';
$sth = $db->prepare ($sql);
$sth->bindParam (':id', $_GET['id']);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->execute ();

$row = $sth->fetch();
echo json_encode (array ('name'=>$row['name']));
?>