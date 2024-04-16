<?php
include 'config.php';  // Include database settings

session_start();

if (isset($_POST['submit'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = md5($_POST['password']);

    // Login queries with parameter binding for security
    $stmt = $conn->prepare("SELECT * FROM user_form WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];  // Save User ID to Session

        header('Location: dashboard.php');
        exit();
    } else {
        $error[] = 'incorrect email or password!';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator - Login</title>
    <link rel="stylesheet" href="pw.css">
</head>
<body>
    <header>
      <a href="index.html" class="index-link">
        <h1>Password Generator</h1>
            </a>
        <div class = "log">
            <a href="login_form.php">Login</a>
            |
             <a href="register_form.php">Register</a>
             </div>
            
             
         
                <button class ="button">Password Manager</button>
    
    
        </header>
        <main>
         
            <section class = "reglog">
              <h2 class = "logreg">Login</h2>
              <form id="loginForm" action="" method="post">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" required> <!-- name을 username에서 email로 변경 -->
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit" name="submit">Login</button> <!-- 제출 버튼에 name 속성 추가 -->
                <p>don't have an account? <a href="register_form.php">Sign Up</a></p>
              </form>

            </section>
          </main>  
    
</body>
</html>

