<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include('dbConnection.php');

$connection = OpenConnection();

// get the limit and offset values from the request parameters
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

$sql = "SELECT * FROM `destination` LIMIT $limit OFFSET $offset";
$result = $connection->query($sql);

if (!$result) {
    trigger_error('Invalid query!' . $connection->error);
}

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

// Get the total number of destinations
$sqlTotal = "SELECT COUNT(*) as total FROM `destination`";
$resultTotal = $connection->query($sqlTotal);
$total = $resultTotal->fetch_assoc()['total'];

$response = array(
    'destinations' => $rows,
    'total' => $total
);

echo json_encode($response);

CloseConnection($connection);
