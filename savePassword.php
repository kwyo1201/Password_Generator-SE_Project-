<?php
session_start();
require 'config.php'; // Include your database configuration file

$user_id = $_SESSION['user_id'];
$password = $_POST['password'];

// Check if the password already exists for the user
$query = "SELECT 1 FROM user_passwords WHERE user_id = ? AND password = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $user_id, $password);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Duplicate password, please generate a new one.']);
} else {
    // If no duplicate, insert the new password
    $insert = "INSERT INTO user_passwords (user_id, password) VALUES (?, ?)";
    $insert_stmt = $conn->prepare($insert);
    $insert_stmt->bind_param("is", $user_id, $password);
    if ($insert_stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save password.']);
    }
    $insert_stmt->close();
}

$stmt->close();
$conn->close();
?>
