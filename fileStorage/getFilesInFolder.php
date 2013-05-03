<?php
require_once '../sessionStart.php';
require "../db.php";
$sql = 'SELECT id,name,size,mime FROM files WHERE userID=:userID and folder=:id';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->bindParam (':id', $_GET['id']);
$sth->execute ();

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>