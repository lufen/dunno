<div id="register">
	<p>
		So you want to register a new account, do you?
	</p>

	<div id="content">
		<?php
		require_once 'user.php';
		require_once 'db.php';
		if (isset($_POST['name'])) {
			try {
				registerUser($db, $_POST['name'], $_POST['streetAddress'], $_POST['postCode'], $_POST['Country'], $_POST['Email'], $_POST['Password']);
				// Redirect back to homepage
			} catch(Exception $e) {
				echo $e -> getMessage();
			}
		}
		?>
		<form method="post" action="register.php">
			<label for="name">Name</label>
			<input type="text" name="name" required  placeholder="John Doe"/>
			<br/>
			<label for="streetAddress">Street adress</label>
			<input type="text" name="streetAddress" required/>
			<br/>
			<label for="postcode">Post code</label>
			<input type="number" name="postCode" required/>
			<br/>
			<label for="country">Country</label>
			<select id="Country" name="Country" required>
				<?php
				include 'countryList.php';
				?>
				<option selected="selected">Norway</option>
			</select></br>
			<label for="Email">Email</label>
			<input type="email" name="Email" required/>
			<br/>
			<label for="Password">Password</label>
			<input type="password" name="Password" required/>
			<br/>
			<input type="submit" value="Register"/>
	</div>
</div>