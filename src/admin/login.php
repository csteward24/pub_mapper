<?php
session_start();

echo "username is \"andrew\", password is \"password\"<br>";

//connect to db
function connectDB() {
        $servername = "127.0.0.1";
        $username = "evansa9";
        $password = "00020615";
        $dbname = "evansa9";

        $connection = new mysqli($servername, $username, $password, $dbname);

        if($connection->connect_error) {
                die("Connection failed: " . $connection->connect_error);
        }

        return $connection;
}

$connection = connectDB();

if ($session['admin']) {
        echo "Logged in";
}
//process post request
else if (isset($_POST['submit'])) {
        $username = $_POST['user'];
        $password = $_POST['password'];

        $query = "SELECT password_hash FROM `admin` WHERE username=\"$username\"";

        $result = $connection->query($query);
        $row = $result->fetch_assoc();
        $hash = $row['password_hash'];
        $match = password_verify($password, $hash);
        if ($match) {
                echo "You have sucessfully logged in";
                $_SESSION['admin'] = TRUE;
        }
        else {
                echo "Username or password was incorrect";
        }
}
else {
        //allow user to login
        ?>
        <form method="POST" action="login.php" name="login">
                Username: <input type="text" name="user"><br><br>
                Password: <input type="password" name="password"><br><br>
                <input type="submit" name="submit" value="Submit">
        </form>
<?php
}


$connection->close();
?>

