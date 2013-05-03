<?php
// Check if user logged in
require_once '../sessionStart.php';
if(!isset($_SESSION['id'])){
 	echo json_encode (array ('ok'=>'NO'));
}else{
 	echo json_encode (array ('ok'=>'OK'));
}
?>
