<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <title>Ships</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <header id="welcome">
        <h1>Welcome, <%= session.getAttribute("username") %>!</h1>
        <button onclick="startGame()">Start Game</button>
    </header>

    <main id="game">
        <div class="filler"></div>
        <div class="board">
            <h3 id="noOfShipsOpponent">Ships Left:</h3>
            <h3 id="noOfShipsHitOpponent">Ships Hit:</h3>
            <h2 id="opponent">Opponent (waiting)</h2>
            <table id="opponentGrid"></table>
        </div>
        <div class="separator"></div>
        <div class="board">
            <h3 id="noOfShipsPlayer">Ships Left: </h3>
            <h2>You (<%= session.getAttribute("username") %>)</h2>
            <table id="playerGrid"></table>
        </div>
        <div class="filler"></div>
    </main>

    <script type="text/javascript" src="javascript/game.js"></script>
</body>

</html>
