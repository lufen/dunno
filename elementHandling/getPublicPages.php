<?php
require "../db.php";
$sql = 'SELECT id,title FROM pages WHERE public=1';
$sth = $db->prepare ($sql);
$sth->execute ();

$row = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);
?>