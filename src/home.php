<!DOCTYPE html>
<html lang ="eng">
  <head>
    <link rel="stylesheet" type="text/css" href="styles.css">
  <title>The Bar Crawler Gameplanner</title>
  </head>
	
<body>
<?php
	include 'header.php';


	switch($_GET['page']){
	case 'home.php':
		include 'map.html';
		break;
	case 'contact_us.php':
		include 'contactus.php';
		break;
	case 'about_us.php':
		include 'about_us.php';
		break;
	}	
?>
</body>	
</html>
