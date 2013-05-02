<?php
require_once 'sessionStart.php';
require "db.php";

parse_str($_POST['pages'], $pageOrder);
foreach ($pageOrder['page'] as $key => $value) {
	$sql = 'UPDATE elements e join pages p on e.pageID=p.id set e.place=:place where e.id=:id and p.userID=:userID';
	$sth = $db->prepare ($sql);
	$sth->bindParam (':userID', $_SESSION['id']);
	$sth->bindParam (':place', $key);
	$sth->bindParam (':id',$value);
	$sth->execute ();
}
?>