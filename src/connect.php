<?php
function connectDB() {
	$servername = "127.0.0.1";
	$username = "evansa9";
	$password = "00020615";
	$dbname = "evansa9";

	$connection = new msqli($servername, $username, $password, $dbname);

	if ($connection->connect_error) {
		die ("Connection failed: " .$connection->connect_error);
	}
	return $connection;
}
