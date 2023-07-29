<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include('dbConnection.php');

$connection = OpenConnection();

// Get the total number of destinations
$sqlTotal = "SELECT COUNT(*) as total FROM `destination`";
$resultTotal = $connection->query($sqlTotal);
$total = $resultTotal->fetch_assoc()['total'];

$response = array(
    'total' => $total
);

echo json_encode($response);

CloseConnection($connection);
