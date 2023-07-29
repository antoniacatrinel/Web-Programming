<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include('dbConnection.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // handle CORS pre-flight request
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // perform validation
    $errors = array();

    if (empty($data['location'])) {
        $errors['location'] = 'Please enter a location.';
    }

    if (empty($data['country'])) {
        $errors['country'] = 'Please enter a country.';
    }

    if (empty($data['description'])) {
        $errors['description'] = 'Please enter a description.';
    }

    if (empty($data['tourist_targets'])) {
        $errors['tourist_targets'] = 'Please enter tourist targets.';
    }

    if (empty($data['cost'])) {
        $errors['cost'] = 'Please enter a cost.';
    } elseif (!is_numeric($data['cost'])) {
        $errors['cost'] = 'Please enter a positive cost.';
    } elseif ((float)$data['cost'] < 0) {
        $errors['cost'] = 'Please enter a positive cost.';
    }

    if (count($errors) > 0) {
        // return validation errors
        http_response_code(400);
        echo json_encode(array('errors' => $errors));
        exit();
    }

    $connection = OpenConnection();

    // avoid sql injection attacks
    $sql = "INSERT INTO `destination`(`location`, `country` ,`description`, `tourist_targets`, `cost`) values (?, ?, ?, ?, ?)";
    $statement = $connection->prepare($sql);
    $statement->bind_param(
        'ssssd',
        $data['location'],
        $data['country'],
        $data['description'],
        $data['tourist_targets'],
        $data['cost']
    );

    if ($statement->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Destination added successfully.'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to add destination.'));
    }

    CloseConnection($connection);
} else {
    http_response_code(405);
    echo json_encode(array('message' => 'Request method not allowed.'));
}
