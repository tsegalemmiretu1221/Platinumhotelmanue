<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$action = isset($_GET['action']) ? $_GET['action'] : 'menu';

if ($action === 'menu') {
    // The data file will be created in the same directory as this script.
    $dataFile = 'menuData.json';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (file_exists($dataFile)) {
            header('Content-Type: application/json');
            echo file_get_contents($dataFile);
        } else {
            // If the file doesn't exist, try to read from the original one or return an empty base structure
            http_response_code(404);
            echo json_encode(['error' => 'Data file not found. Please save from admin panel first.']);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        if ($data) {
            if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to write to file. Check folder permissions.']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
        }
    }
} elseif ($action === 'upload') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
        $uploadDir = 'images/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $filename = time() . '-' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $filename;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            echo json_encode(['url' => 'images/' . $filename]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload image. Check folder permissions.']);
        }
    } else {
         http_response_code(400);
         echo json_encode(['error' => 'No image provided']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
}
