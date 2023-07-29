<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include('dbConnection.php');

$connection = OpenConnection();

$sql = "SELECT DISTINCT country FROM destination";
$result = $connection->query($sql);

if (!$result) {
    trigger_error('Invalid query: ' . $connection->error);
}

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);

CloseConnection($connection);
