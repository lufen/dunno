<?php

require 'user.php';

if(session_id() == '') {
	session_start();
}

if (isset($_SESSION['id'])) {
	header('Location: mypage.php');
}

if (isset($_POST['email'])) {
	if (login($_POST['email'], $_POST['password']) == NULL) {
		echo "Wrong username or password";
	}
}
//header( 'Location: mypage.php' );
?>
<form method="post" action="login.php">
	<h2> Login <small>Enter your credentials</small></h2>
	<p><label for="name">Username:</label>
		<input type="text" name="email" required/></p>
	<p><label for="pwd">Password:</label>
		<input type="password" name="password" required/></p>
	<p><input type="submit" id="submit" value="Login" name="submit"/></p>
</form>

<!--
/*
$username = $_POST['username'];
$password = $_POST['password'];

$login = $_GET['login'];

setcookie("username", "$username", time()+86400);

if($login == 'yes'){
$con = mysql_connect("moosecloud.net", "dunno", "dunno");
mysql_select_db("login");
$get = mysql_query("SELECT count(id) FROM login WHERE user='$username' and pass='password'");
$result = mysql_result($get, 0);

if(result !=1){
echo "invalid username";

}else{
echo "login successful. Welcome " , $_COOKIE['username'];
$_SESSION['username'] = $username;
}
}
*/
-->