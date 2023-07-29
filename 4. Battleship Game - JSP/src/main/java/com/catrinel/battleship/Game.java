package com.catrinel.battleship;

import java.util.*;

public class Game {
    public static final int GRID_SIZE = 10;
    public static final int NO_SHIPS = 5;

    private String[][] player1Grid;
    private String[][] player2Grid;
    private String currentPlayer;
    private String player1;
    private String player2;
    private boolean ended;
    private String winner;
    private static final List<String> loggedUsers = new ArrayList<>();

    public Game(String player1) {
        this.currentPlayer = player1;
        this.player1 = player1;

        this.player1Grid = new String[GRID_SIZE][GRID_SIZE];
        this.player2Grid = new String[GRID_SIZE][GRID_SIZE];

        Random random = new Random();
        Set<String> usedCoordinatesPlayer1 = new HashSet<>();
        Set<String> usedCoordinatesPlayer2 = new HashSet<>();

        for (int i = 0; i < NO_SHIPS; i++) {
            String coordinates;
            do {
                int x = random.nextInt(GRID_SIZE);
                int y = random.nextInt(GRID_SIZE);
                coordinates = x + "," + y;
            } while (usedCoordinatesPlayer1.contains(coordinates));

            usedCoordinatesPlayer1.add(coordinates);
            int x = Integer.parseInt(coordinates.split(",")[0]);
            int y = Integer.parseInt(coordinates.split(",")[1]);
            this.player1Grid[x][y] = "ship";

            do {
                int x2 = random.nextInt(GRID_SIZE);
                int y2 = random.nextInt(GRID_SIZE);
                coordinates = x2 + "," + y2;
            } while (usedCoordinatesPlayer2.contains(coordinates));

            usedCoordinatesPlayer2.add(coordinates);
            x = Integer.parseInt(coordinates.split(",")[0]);
            y = Integer.parseInt(coordinates.split(",")[1]);
            this.player2Grid[x][y] = "ship";
        }
    }

    public String[][] getPlayer1Grid() {
        return player1Grid;
    }

    public String[][] getPlayer2Grid() {
        return player2Grid;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public String getPlayer1() {
        return player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public boolean hasEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public void setPlayer1Grid(String[][] player1Grid) {
        this.player1Grid = player1Grid;
    }

    public void setPlayer2Grid(String[][] player2Grid) {
        this.player2Grid = player2Grid;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public static boolean isUserLogged(String user) {
        return loggedUsers.contains(user);
    }

    public static void loginUser(String user) {
        if (!loggedUsers.contains(user)) {
            loggedUsers.add(user);
        }
    }

    public static void logoutUser(String user) {
        loggedUsers.remove(user);
    }
}

