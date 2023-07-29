package com.catrinel.battleship;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "game", urlPatterns = {"/game"})
public class GameServlet extends HttpServlet {
    private static final String USERNAME = "username";
    private static final String GAME = "game";
    private static final String SHIP = "ship";
    private static final String HIT = "hit";
    private static final String MISS = "miss";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = (String) request.getSession().getAttribute(USERNAME);
        Game game = (Game) getServletContext().getAttribute(GAME);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        if (!isInGame(game, username)) {
            out.print("{\"result\":\"You are not currently in a game!\"}");
            out.close();
            return;
        }

        String opponentUsername = getOpponentUsername(username, game);
        String[][] playerGrid = getPlayerGrid(username, game);
        String[][] opponentGrid = getOpponentGrid(username, game);

        if(game.hasEnded()) {
            String result;
            if (username.equals(game.getWinner())) {
                result = "win";
            } else {
                result = "loss";
            }

            out.print("{");
            out.print("\"result\":\"" + result + "\",");
            out.print("\"playerGrid\":" + gridToJson(playerGrid, true) + ",");
            out.print("\"opponentGrid\":" + gridToJson(opponentGrid, false));
            out.print("}");
            resetGame();

            out.close();
            return;
        }

        Integer noOfShipsPlayer = numberShipsLeft(playerGrid);
        Integer noOfShipsOpponent = numberShipsLeft(opponentGrid);
        Integer noOfShipsHitOpponent = Game.NO_SHIPS - noOfShipsOpponent;

        out.print("{");
        out.print("\"opponent\":\"" + opponentUsername + "\",");
        out.print("\"noOfShipsPlayer\":" + noOfShipsPlayer + ",");
        out.print("\"noOfShipsOpponent\":" + noOfShipsOpponent + ",");
        out.print("\"noOfShipsHitOpponent\":" + noOfShipsHitOpponent + ",");
        out.print("\"playerGrid\":" + gridToJson(playerGrid, true) + ",");
        out.print("\"opponentGrid\":" + gridToJson(opponentGrid, false));
        out.print("}");
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = (String) request.getSession().getAttribute(USERNAME);
        Game game = (Game) getServletContext().getAttribute(GAME);
        String action = request.getParameter("action");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        if (action.equals("start")) {
            if (game == null) {
                game = createNewGame(username);
                getServletContext().setAttribute(GAME, game);
            } else if (game.getPlayer2() == null) {
                game.setPlayer2(username);
            } else {
                out.print("{\"result\":\"The game already has 2 players!\"}");
                out.close();
                return;
            }

            out.print("{");
            out.print("\"playerGrid\":" + gridToJson(username.equals(game.getPlayer1()) ? game.getPlayer1Grid() : game.getPlayer2Grid(), true) + ",");
            out.print("\"opponentGrid\":" + gridToJson(username.equals(game.getPlayer1()) ? game.getPlayer2Grid() : game.getPlayer1Grid(), false));
            out.print("}");
            out.close();
        } else if (action.equals("move")) {
            if (!isPlayerTurn(game, username)) {
                out.print("{\"result\":\"It's not your turn yet!\"}");
                out.close();
                return;
            }

            if (game.getPlayer2() == null) {
                out.print("{\"result\":\"Waiting for another player to join...\"}");
                out.close();
                return;
            }

            int x = Integer.parseInt(request.getParameter("x"));
            int y = Integer.parseInt(request.getParameter("y"));
            String[][] opponentGrid = getOpponentGrid(username, game);

            if (opponentGrid[x][y] != null) {
                if (opponentGrid[x][y].equals(SHIP)) {
                    opponentGrid[x][y] = HIT;

                    if (areShipsLeft(opponentGrid)) {
                        out.print("{");
                        out.print("\"result\":\"win\",");
                        out.print("\"opponentGrid\":" + gridToJson(opponentGrid, false));
                        out.print("}");

                        out.close();
                        game.setEnded(true);
                        game.setWinner(username);
                        resetGame();
                        return;
                    }

                    out.print("{");
                    out.print("\"result\":\"You hit a ship!\",");
                    out.print("\"opponentGrid\":" + gridToJson(opponentGrid, false));
                    out.print("}");
                } else if (opponentGrid[x][y].equals(HIT) || opponentGrid[x][y].equals(MISS)) {
                    out.print("{\"result\":\"You already attacked that tile!\"}");
                }
            } else {
                opponentGrid[x][y] = MISS;

                out.print("{");
                out.print("\"result\":\"You missed!\",");
                out.print("\"opponentGrid\":" + gridToJson(opponentGrid, false));
                out.print("}");
            }

            game.setCurrentPlayer(getOpponentUsername(username, game));
            out.close();
        }
    }

    private boolean isInGame(Game game, String username) {
        return game != null && (game.getPlayer1().equals(username) || game.getPlayer2().equals(username));
    }

    private String getOpponentUsername(String username, Game game) {
        return username.equals(game.getPlayer1()) ? game.getPlayer2() : game.getPlayer1();
    }

    private String[][] getPlayerGrid(String username, Game game) {
        return username.equals(game.getPlayer1()) ? game.getPlayer1Grid() : game.getPlayer2Grid();
    }

    private String[][] getOpponentGrid(String username, Game game) {
        return username.equals(game.getPlayer1()) ? game.getPlayer2Grid() : game.getPlayer1Grid();
    }

    private boolean areShipsLeft(String[][] grid) {
        for (String[] row : grid) {
            for (String cell : row) {
                if (cell != null && cell.equals(SHIP)) {
                    return false;
                }
            }
        }
        return true;
    }

    private Integer numberShipsLeft(String[][] grid) {
        Integer noShips = 0;

        for (String[] row : grid) {
            for (String cell : row) {
                if (cell != null && cell.equals(SHIP)) {
                    noShips++;
                }
            }
        }
        return noShips;
    }

    private Game createNewGame(String username) {
        return new Game(username);
    }

    private boolean isPlayerTurn(Game game, String username) {
        return game != null && game.getCurrentPlayer() != null && game.getCurrentPlayer().equals(username);
    }

    private void resetGame() {
        getServletContext().setAttribute(GAME, null);
    }

    private String gridToJson(String[][] grid, boolean isPlayer) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < Game.GRID_SIZE; i++) {
            json.append("[");
            for (int j = 0; j < Game.GRID_SIZE; j++) {
                var displayedValue = grid[i][j];
                if (!isPlayer && displayedValue != null && displayedValue.equals(SHIP)) {
                    displayedValue = null;
                }

                json.append("\"").append(displayedValue).append("\"");
                if (j < Game.GRID_SIZE - 1) {
                    json.append(",");
                }
            }
            json.append("]");
            if (i < Game.GRID_SIZE - 1) {
                json.append(",");
            }
        }
        json.append("]");
        return json.toString();
    }
}