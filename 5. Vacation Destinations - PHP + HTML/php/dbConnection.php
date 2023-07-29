<?php

function OpenConnection(): mysqli
{
    $server = "localhost";
    $user = "root";
    $password = "";
    $database = "vacation_destinations";

    $connection = mysqli_connect($server, $user, $password, $database);

    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }

    return $connection;
}

function CloseConnection(mysqli $connection): void
{
    $connection->close();
}
