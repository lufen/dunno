<?php
require "db.php";
$sql = 'SELECT title FROM pages WHERE id=:pageID';
$sth = $db->prepare ($sql);
$sth->bindParam (':pageID', $_GET['id']);
$sth->execute ();

$row = $sth->fetch();
echo json_encode (array ('title'=>$row['title']));
?>