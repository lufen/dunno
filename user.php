<?php
	function login ($email,$password) {
		require "db.php";
		$sql = 'SELECT * FROM users WHERE email=:email';
		$sth = $db->prepare ($sql);
		$sth->bindParam (':email', $email);
		$sth->execute ();
		if ($row = $sth->fetch()) {
			$fromUser = convertPlainTextToEncrypted($password,$row['id']);
			if($row['password'] == convertPlainTextToEncrypted($password,$row['id'])){
				$_SESSION['id'] = $row['id'];
				echo json_encode (array ('ok'=>'OK'));
			} else{
				echo json_encode (array ('message'=>$fromUser));
			}
		}
	}

function convertPlainTextToEncrypted($password,$uid){
	// Convert a password from plaintext into a encrypted one
	$salt = "c63b03f38470b6c30abdb8d2b7e59b14ddeb6a0d6e56956b0df44a0a8dd3cf6980dcbd907cb9aa1ea9edccb37739e20e240ddeafd68d386d289cd68ee9343167";
	$hash = sha1($salt.$uid.$password);
	return $hash;
}

function registerUser($email, $password){
	require "db.php";
	require_once 'sessionStart.php';
	$db->beginTransaction();
	$db->query('LOCK TABLES users WRITE');
	// Add user, then read back and update it with the encrypted one.
	$sql = 'INSERT INTO users (email, password)VALUES (:email, :password)';
	$sth = $db->prepare ($sql);
	$sth->bindValue (':email', $email);
	$sth->bindValue (':password',"hei");
	$sth->execute ();
	if($sth->rowCount() == 0){
		// In case of error, rollback
		$db->rollBack();                     
		$db->query ('UNLOCK TABLES'); 
		echo json_encode (array ('message'=>'Email not unique'));
	}
	$uid = $db->lastInsertId();
	// Update users password to an encrypted one
	$sql = 'update users set password = :password where id = :id';
	$sth = $db->prepare ($sql);
	$sth->bindValue (':password',convertPlainTextToEncrypted($password,$uid));
	$sth->bindValue (':id',$uid);
	$sth->execute ();
	if ($sth->rowCount()==0) {                      
		$db->rollBack();                      
		$db->query('UNLOCK TABLES');
		echo json_encode (array ('message'=>'Error happened'));
	}
	$db->commit();
	echo json_encode (array ('ok'=>'OK'));
}

// Check if user logged in, if not then redirect to login page.
function CheckIfUserLoggedIn(){
	require_once 'sessionStart.php';
	if(!isset($_SESSION['id'])){
		 header( 'Location: index.php' );
		}
}

// Check that an admin is logged in
function CheckIfAdminLoggedIn(){
	require_once 'sessionStart.php';
	if($_SESSION['userLevel'] != 2){
		 header( 'Location: index.php' );
		}
}

// Check that a worker is logged in
function CheckIfWorkerLoggedIn(){
	require_once 'sessionStart.php';
	if($_SESSION['userLevel'] != 1){
		 header( 'Location: index.php' );
		}
}

function emptyBasket(){
	require_once 'sessionStart.php';
	// Empty out the shoppingbasket
	 foreach ($_SESSION as $key => $quantity){
	    if($key ==="id" || $key === "userLevel")
      		continue;
      	unset($_SESSION[$key]);
	 }
}
?>