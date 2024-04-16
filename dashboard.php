<?php
    session_start(); // 세션 시작
    if (!isset($_SESSION['user_id'])) {
        // 사용자가 로그인하지 않았다면, 로그인 페이지로 리다이렉트
        header("Location: login_form.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator</title>
    <link rel="stylesheet" href="pw.css">
    <link rel="stylesheet" href="jp.css">
    <script src="imports/chance.js"></script>
    <script src="imports/randomwords.js"></script>
    <script src="imports/seedrandom.js"></script>
    <script src="model.js"></script>
    
    <script src="controller.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@zxcvbn-ts/core@2.0.0/dist/zxcvbn-ts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@zxcvbn-ts/language-common@2.0.0/dist/zxcvbn-ts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@zxcvbn-ts/language-en@2.0.0/dist/zxcvbn-ts.js"></script>
    <script>
        ;(function () {
          // all package will be available under zxcvbnts
          const options = {
            translations: zxcvbnts['language-en'].translations,
            graphs: zxcvbnts['language-common'].adjacencyGraphs,
            dictionary: {
              ...zxcvbnts['language-common'].dictionary,
              ...zxcvbnts['language-en'].dictionary,
            },
          }
          zxcvbnts.core.zxcvbnOptions.setOptions(options)
          console.log(zxcvbnts.core.zxcvbn('somePassword'))
        })()
    </script>
</head>
<body>
    <header>
    <a href="dashboard.php" class="index-link">
            <h1>Password Generator</h1>
        </a>
        <a href="password_manager.php">
            <button class="button">Password Manager</button>
        </a>
        <a href="logout.php" class="index-link">
            <div class="logout">
                Log Out
            </div>
        </a>
    </header>
    <main class = "main">
      <div class="line"></div>

    
    <br>
    <div class = "box">
    <table class="table">
      <thead>
      <tr>
      <th style="text-align: center;">Score</th>
      <th style="text-align: left;">Description</th>
      <th style="text-align: center;">Guesses</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style="text-align: center;">0</td>
      <td style="text-align: left;">Too guessable: risky password</td>
      <td style="text-align: center;">&lt; 10^3</td>
      </tr>
      <tr>
      <td style="text-align: center;">1</td>
      <td style="text-align: left;">Very guessable: protection from throttled online attacks</td>
      <td style="text-align: center;">&lt; 10^6</td>
      </tr>
      <tr>
      <td style="text-align: center;">2</td>
      <td style="text-align: left;">Somewhat guessable: protection from unthrottled online attacks</td>
      <td style="text-align: center;">&lt; 10^8</td>
      </tr>
      <tr>
      <td style="text-align: center;">3</td>
      <td style="text-align: left;">Safely unguessable: moderate protection from offline slow-hash scenario</td>
      <td style="text-align: center;">&lt; 10^10</td>
      </tr>
      <tr>
      <td style="text-align: center;">4</td>
      <td style="text-align: left;">Very unguessable: strong protection from offline slow-hash scenario</td>
      <td style="text-align: center;">&gt;= 10^10</td>
      </tr>
      </tbody>
    </table>    
    </div>
<br><br><br>
<div id="mainContent">

<br>
<div class="param">
    <h3>Select Parameters</h3>
<body>
  <form onsubmit="return mySubmit(event)">
    <p>Please select your password generation strategy:</p>
  <div id="strategy">
  <input type="radio" id="character" name="algo" value="characters" checked="checked">
  <label for="character">Random Characters</label>
  <input type="radio" id="words" name="algo" value="words">
  <label for="words">Random Words</label>
  <input type="radio" id="perms" name="algo" value="perms">
  <label for="words">Random Leet Words</label>
  <input type="radio" id="syllables" name="algo" value="syllables">
  <label for="words">Random Syllables</label>
  </div>
<div><label for="length">Password Length</label><input type="number" id="length" value="8" min="1" max="50" step="1"></div>

  <div id="options">
    <div><label for="symbol">Add Symbols</label><input type="checkbox" id="symbol"></div>
    <div><label for="symbol">Add Numbers</label><input type="checkbox" id="numeric"></div>
    <div><label for="symbol">Contain Capital Letter(s)</label><input type="checkbox" id="capitalLetters"></div>
  </div>
  <label for="list">Enter comma-separated list of words to include in your password:</label>
  <input type="text" id="list" name="list">
  <div><label for="length">Number of Passwords</label><input type="number" id="numpw" value="20" min="1" max="50" step="1"></div>
  <br>
  <input type="submit" value="Generate!">
  </form>
  
    </div>
    <br>
<div id="lowerSection">

  
    <table id="password-table">
      <thead><tr><th>Password</th><th>Score</th><th>Actions</th></tr></thead>
      <tbody id="password-table-body">

      </tbody>

    </table>
     
    <table id="pwchecker">
      <thead><tr><td>Check your password's strength:</td><td><input type="text" id="testpw" name="list"></td></tr></thead>
      <tbody id="checker-table-body"><tr><td>Length</td><td>0</td></tr><tr><td>Average # of guesses to crack</td><td>12</td></tr><tr><td>Score</td><td>0</td></tr><tr><td>Online Throttled Attack (100 Guesses/hr)</td><td>7 minutes</td></tr><tr><td>Online Unthrottled Attack (10 Guesses/sec)</td><td>1 second</td></tr><tr><td>Offline Slow Hashing Attack (e^4 Guesses/sec)</td><td>less than a second</td></tr><tr><td>Offline Fast Hashing Attack (e^10 Guesses/sec)</td><td>less than a second</td></tr><tr><td>Suggestion</td><td>Add more words that are less common.</td></tr></tbody>

    </table>
</div>
</div>
    </main>

    

</body>
<script src="view.js"></script>
</html>



