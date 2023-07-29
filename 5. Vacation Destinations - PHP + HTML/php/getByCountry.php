<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: GET');

include('dbConnection.php');

$connection = OpenConnection();

$country = $_GET['country'];

// get the limit and offset values from the request parameters
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

// build the SQL query with the limit and offset values
$sql = "SELECT * FROM destination WHERE country = ? LIMIT ? OFFSET ?";

$stmt = $connection->prepare($sql);
$stmt->bind_param('sii', $country, $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    trigger_error('Invalid query: ' . $connection->error);
}

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);

CloseConnection($connection);
