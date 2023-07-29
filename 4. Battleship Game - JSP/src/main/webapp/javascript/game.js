async function startGame() {
    const response = await fetch("/battleship_war_exploded/game", {
        method: "POST",
        body: new URLSearchParams({ action: "start" }),
    });
    const data = await response.json();

    if (data.result)
    {
        alert(data.result);
        return;
    }

    if (data.playerGrid && data.opponentGrid) {
        updateGrids(data.playerGrid, data.opponentGrid);
        document.getElementById("welcome").style.display = "none";
        document.getElementById("game").style.display = "flex";

        // check for updates
        getUpdates();
    } else {
        console.error("Invalid response from the server:", data);
    }
}

function getUpdates() {
    fetch("/battleship_war_exploded/game", {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            if (data.result && data.result === "loss") {
                alert("You lose!")
                location.reload();
                return;
            }

            if (data.playerGrid && data.opponentGrid) {
                let opponent = "waiting"
                if (data.opponent && data.opponent !== "null") {
                    opponent = data.opponent
                }


                document.getElementById("opponent").innerHTML = "Opponent (" + opponent + ")"
                document.getElementById("noOfShipsPlayer").innerHTML = "No. of ships left: " + data.noOfShipsPlayer
                document.getElementById("noOfShipsOpponent").innerHTML = "No. of ships left: " + data.noOfShipsOpponent
                document.getElementById("noOfShipsHitOpponent").innerHTML = "No. of ships hit: " + data.noOfShipsHitOpponent
                updateGrids(data.playerGrid, data.opponentGrid);
            } else {
                console.error("Invalid response from the server:", data);
            }
        })
        .finally(() => {
            // check for updates again after delay
            setTimeout(getUpdates, 1000);
        });
}

function updateGrids(playerGrid, opponentGrid) {
    if (playerGrid) {
        document.getElementById("playerGrid").innerHTML = gridToHtml(playerGrid, false);
    }

    if (opponentGrid) {
        document.getElementById("opponentGrid").innerHTML = gridToHtml(opponentGrid, true);
    }
}

function gridToHtml(grid, isOpponent) {
    let html = '';
    for (let i = 0; i < grid.length; i++) {
        html += '<tr>';
        for (let j = 0; j < grid[i].length; j++) {
            html += '<td onclick="';
            if (isOpponent) {
                html += 'makeMove(' + i + ',' + j + ')';
            }
            html += '" class="' + grid[i][j] + '"></td>';
        }
        html += '</tr>';
    }
    return html;
}

function makeMove(x, y) {
    fetch('game', { method: 'POST', body: new URLSearchParams('action=move&x=' + x + '&y=' + y) })
        .then(response => response.json())
        .then(data => {
            updateGrids(data.playerGrid, data.opponentGrid);

            if (data.result === "win") {
                alert("You win!")
                location.reload();
                return;
            }

            alert(data.result);
        });
}
