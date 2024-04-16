<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Manager</title>
    <link rel="stylesheet" href="pw.css">
</head>

<body>
    <header>
        <a href="dashboard.php" class="index-link">
            <h1>Password Generator</h1>
        </a>
    </header>

    <h1 class="sp">Saved Passwords:</h1>
    <div class="container">
    <?php
session_start();  // Start the session

// Check if the user is not logged in
if (!isset($_SESSION['user_id'])) {
    // If not logged in, display a message and stop further execution
    echo '<p>You must be logged in to view this page. <a href="login_form.php">Log in here</a></p>';
    exit();  // Stop the script from running further
}

// Continue with the rest of the code if the user is logged in
require 'config.php';  // Include your database configuration file

$user_id = $_SESSION['user_id'];

// SQL to fetch passwords
$sql = "SELECT password, created_at FROM user_passwords WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

echo "<ul>";
while ($row = $result->fetch_assoc()) {
    echo "<li>" . htmlspecialchars($row['password']) . " - " . $row['created_at'] . "</li>";
}
echo "</ul>";

$stmt->close();
$conn->close();
?>


    </div>
</body>
</html>





