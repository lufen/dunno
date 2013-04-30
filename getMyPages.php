<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'SELECT id,title FROM pages WHERE userID=:userID';
$sth = $db->prepare ($sql);
$sth->bindParam (':userID', $_SESSION['id']);
session_write_close();
$sth->execute ();

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>