<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'SELECT * FROM elements WHERE pageID=:pageID';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_GET['id']);
$sth->execute ();

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>