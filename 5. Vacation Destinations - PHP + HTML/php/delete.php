<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include('dbConnection.php');

//if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
$destinationId = $_GET['id'];

$connection = OpenConnection();

// avoid sql injection attacks
$sql = "DELETE FROM `destination` WHERE `id` = ?";
$statement = $connection->prepare($sql);
$statement->bind_param('i', $destinationId);

if ($statement->execute()) {
    http_response_code(200);
    echo json_encode(array('message' => 'Destination deleted successfully.'));
} else {
    http_response_code(500);
    echo json_encode(array('message' => 'Failed to delete destination.'));
}

CloseConnection($connection);
