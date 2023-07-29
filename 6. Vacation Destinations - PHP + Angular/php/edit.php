<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include('dbConnection.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // handle CORS pre-flight request
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $destinationId = $_GET['id'];

    $data = json_decode(file_get_contents('php://input'), true);

    $requiredFields = array('location', 'country', 'description', 'tourist_targets', 'cost');

    $updatedData = json_decode(file_get_contents('php://input'), true);

    // Check if all required fields are present
    foreach ($requiredFields as $field) {
        if (!isset($updatedData[$field])) {
            http_response_code(400);
            echo json_encode(array('message' => 'Missing required field: ' . $field));
            exit();
        }
    }

    // Validate input data
    if (!is_numeric($updatedData['cost'])) {
        http_response_code(400);
        echo json_encode(array('message' => 'Please enter a positive cost.'));
        exit();
    }

    // Check if the destination ID is a valid integer
    if (!ctype_digit($destinationId)) {
        http_response_code(400);
        echo json_encode(array('message' => 'Invalid destination ID: ' . $destinationId));
        exit();
    }

    $connection = OpenConnection();

    $sql = "UPDATE `destination` SET `location` = ?, `country` = ?, `description` = ?, `tourist_targets` = ?, `cost` = ? WHERE `id` = ?";
    $statement = $connection->prepare($sql);
    $statement->bind_param(
        'ssssdi',
        $updatedData['location'],
        $updatedData['country'],
        $updatedData['description'],
        $updatedData['tourist_targets'],
        $updatedData['cost'],
        $destinationId
    );

    if ($statement->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Destination updated successfully.'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to update destination.'));
    }

    CloseConnection($connection);
} else {
    http_response_code(405);
    echo json_encode(array('message' => 'Request method not allowed.'));
}
