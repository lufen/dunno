<?php
require_once '../sessionStart.php';
require "../db.php";
$sql = 'SELECT e.id as id,content,place FROM elements e join pages p on e.pageID=p.id WHERE pageID=:pageID and userID=:userID order by e.place';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_GET['id']);
$sth->bindParam (':userID', $_SESSION['id']);
$sth->execute ();

// Last page opened
$_SESSION['pageID'] = $_GET['id'];

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>