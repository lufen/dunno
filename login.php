<div id="content">
	<?php
	require 'user.php';
	require 'sessionstart.php';
// 
	// if (isset($_SESSION['id'])) {
		// header('Location: mypage.php');
	// }

	if (isset($_POST['email'])) {
		try {
			login($_POST['email'], $_POST['password']);
		} catch(Exception $e) {
			echo $e -> getMessage();
		}
	}
	?>
	<form method="post" action="login.php">
		<h2> Login <small>Enter your credentials</small></h2>
		<p>
			<label for="name">Username:</label>
			<input type="text" name="email" required/>
		</p>
		<p>
			<label for="pwd">Password:</label>
			<input type="password" name="password" required/>
		</p>
		<p>
			<input type="submit" id="submit" value="Login" name="submit"/>
		</p>
	</form>

