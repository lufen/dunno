<?php

	require_once 'sessionStart.php';
	require "db.php";
	
	try{
		$sql = 'SELECT email FROM users WHERE id=:userID';
		
		$sth = $db->prepare ($sql);

		$sth->bindParam (':userID', $_SESSION['id']);
		$sth->execute ();

		$sth->setFetchMode(PDO::FETCH_ASSOC);

		if($sth->rowCount() === 1){
				$row = $sth->fetch();
				echo $row['email'];
			}else{
			echo "More than one rows are effected when trying to fetch email\n"
			}
		
	}catch(Exception $e){
		echo "Failed fetching e-mail!";
	}
?>