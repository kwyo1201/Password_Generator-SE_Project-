<?php

@include 'config.php';

if(isset($_POST['submit'])){

   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = md5($_POST['password']);
   $cpass = md5($_POST['cpassword']);

   $select = " SELECT * FROM user_form WHERE email = '$email' && password = '$pass' ";

   $result = mysqli_query($conn, $select);

   if(mysqli_num_rows($result) > 0){

      $error[] = 'user already exist!';

   }else{

      if($pass != $cpass){
         $error[] = 'password not matched!';
      }else{
         $insert = "INSERT INTO user_form(name, email, password) VALUES('$name','$email','$pass')";
         mysqli_query($conn, $insert);
         header('location:login_form.php');
      }
   }

};


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator - Register</title>
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
            <!-- Registration Form -->
            <section class = "reglog">
              <h2 class = "logreg">Register</h2>
              <form id="registrationForm" action="" method="post" onsubmit="return validateForm()">
              <input type="text" name="name" required placeholder="enter your name">
              <input type="email" name="email" required placeholder="enter your email">
              <input type="password" name="password" required placeholder="enter your password">
              <input type="password" name="cpassword" required placeholder="confirm your password">
              <input type="submit" name="submit" value="register now" class="form-btn">
              </form>
            </section>
          </main>
    
</body>
</html>