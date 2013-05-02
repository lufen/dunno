<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'SELECT * FROM files WHERE (userID=:userID or published=1) and id=:id';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->bindParam (':id', $_GET['id']);
$sth->execute ();
$row = $sth->fetch();
$file = $row['content'];
header("Cache-Control: no-cache private");
header("Content-Description: File Transfer");
header('Content-disposition: attachment; filename='.$row['name']);
header("Content-Type: ".$row['mime']);
header('Content-Length: '. $row['size']);
echo $file;
?>