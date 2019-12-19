<?php

//connects to database
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

//get data from admin table
$query = "SELECT * FROM `admin` LIMIT 1";
$result = $connection->query($query);
$data = array();

if ($result) {
        while ($row = $result->fetch_assoc()) {
                $data[] = $row;
        }
        $result->free();
}

//Don't add it admin exists
if ($data[0]) {
        echo "There is already a password, you cannot create another.";
}
//add data if post
else if (isset($_POST['submit'])) {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        //store
        $query = "INSERT INTO `admin` (username, password_hash)  VALUES ('$username', '$hashedPassword')";
        $result = $connection->query($query);

        if ($result === TRUE) {
                echo "Password added.";
        }
        else {
                echo "Error in adding data";
        }
}
//display form to enter admin
else { ?>
        <p>This will display if there is no pw</p>
        <form action="./generate.php" method="post">
                Username: <br>
                <input type="text" name="username" required><br>
                Password: <br>
                <input type="password" name="password" required><br><br>
                <input type="submit" name="submit">
        </form>
<?php
}



$connection->close();
?>

