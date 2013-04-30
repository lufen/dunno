<?php
require_once 'sessionStart.php';
require "db.php";
$sql = 'SELECT place,content FROM elements e join pages p on p.id=e.pageID WHERE e.pageID=:pageID and p.public=1 order by e.place';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_GET['id']);
$sth->execute ();

// Last page opened
$_SESSION['pageID'] = $_GET['id'];

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>