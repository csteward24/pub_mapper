<?php
//connect to DB
$servername = "127.0.0.1";
$username = "evansa9";
$password = "00020615";
$dbname = "evansa9";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
        die("Connection failed: " . $connection->connection_error);
}

//process post data
$validInput = $validName = $validEmail = $validComment = false;

$name='';
$email='';
$comment='';

if ($_SERVER['REQUEST_METHOD'] === "POST") {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $comment = $_POST['comment'];

        $validName = checkName($name);
        $validEmail = checkEmail($email);
        $validComment = checkComment($comment);

	$validInput = $validName && $validEmail && $validComment;

        $ip_address = $_SERVER['REMOTE_ADDR'];

        $insertsql = "INSERT INTO contact_us (name, email, comment, ip_address) VALUES ('$name', '$email','$comment','$ip_address')";

        if ($validInput && $connection->query($insertsql) === TRUE) {

                echo "The following data has been submitted:<br>";
                echo "Name: ".$name ."<br>";
                echo "Email: ".$email ."<br>";
                echo "Comment: ".$comment ."<br>";
                echo "IP Address: " .$ip_address ."<br>";
 
	}
	else {
                echo "Error has occured or input data is not valid.";
	}
}


else { ?>

<form method="POST" action="./contactus.php?submit=true" name="contact" id="contact">
     Name: <input type="text" name="name"><span style="color:red">*Name is required</span><br>
     Email: <input type="email" name="email"><span style="color:red">*Email is required</span><br>
     Comment: <input type="text" name="comment"><span style="color:red">*Comment is required</span><br>
     <input type="submit" name="submit" value="Submit" id="submit_btn">
     <input type="button" name="clear" value="Reset" onClick="resetForm()">
</form>

<?php
}

$connection->close();

//check functions
function checkEmail($email) {

        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        if (empty($email)){
                $GLOBALS['emailError'] = "Please enter a valid email";
                return false;
        }
        return true;
}

function checkName($name) {

        $name = trim($name);
        $name = stripslashes($name);
        $name = htmlspecialchars($name);

        if (empty($name)){
                return false;
        }
        return true;
}

function checkComment($comment) {
        $comment = stripslashes($comment);
        $comment = htmlspecialchars($comment);

        if(empty($comment)) {
                return false;
        }
        return true;
}
?>
<script>
function resetForm() {
        document.getElementById("contact").reset();
}
</script>
