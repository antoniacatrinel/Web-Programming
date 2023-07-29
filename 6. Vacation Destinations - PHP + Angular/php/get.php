<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include('dbConnection.php');

$destinationId = $_GET['id'];

$connection = OpenConnection();

$sql = "SELECT * FROM `destination` where `id` = ?";
$statement = $connection->prepare($sql);
$statement->bind_param('i', $destinationId);

$statement->execute();
$result = $statement->get_result();

if (!$result) {
    trigger_error('Invalid query!' . $connection->error);
}

$row = $result->fetch_assoc();

echo json_encode($row);

CloseConnection($connection);
