<?php
session_start();

if ($_SESSION['admin']) {

//connect to db
$servername = "127.0.0.1";
$username = "evansa9";
$password = "00020615";
$dbname = "evansa9";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
}

//retrieve contents of contact_us
$query = "SELECT * FROM `contact_us`";
$result = $connection->query($query);

$data = array();

if ($result) {
        while($row = $result->fetch_assoc()) {
                $data[] = $row;
        }
        $result->free();
}

//print in table
$connection->close();
?>
<!DOCTYPE html>
<html lang="en">
        <head>
                <style>
                        table, th, tr, td {
                                border: 1px solid black;
                                text-align: left;
                        }
                        tr:nth-child(odd) {
                                background-color: #f2f2f2;
                        }
                        table {
                                margin-top: 20px;
                                margin-left: 20px;
                        }
                </style>
                <title>Contact Us Table</title>
        </head>
        <body>
                <table>
                        <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Comment</th>
                                <th>IP Address</th>
                        </tr>
                        <?php

                        foreach($data as $row) {
                                echo '<tr>'.PHP_EOL;
                                foreach ($row as $column) {
                                        echo '<td>'.PHP_EOL;
                                        echo $column.PHP_EOL;
                                        echo '</td>'.PHP_EOL;
                                }
                                echo '</tr>'.PHP_EOL;
                        }
                        ?>
                </table>
        </body>
</html>

<?php
}
else {
?>
        <a href="./login.php">You are not logged in, click this text to login.</a>

<?php
}
?>


