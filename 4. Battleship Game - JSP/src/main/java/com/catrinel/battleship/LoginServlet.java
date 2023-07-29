package com.catrinel.battleship;

import java.io.*;
import java.sql.*;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final String DB_USERNAME = "sa";
    private static final String DB_PASSWORD = "@dm1n123";
    private static final String DB_URL = "jdbc:sqlserver://localhost;databaseName=web;encrypt=false;";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (checkLogin(username, password)) {
            if (Game.isUserLogged(username)) {
                response.sendRedirect("login.jsp?error=already_logged_in");
            } else {
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                Game.loginUser(username);

                response.sendRedirect("game.jsp");
            }
        } else {
            response.sendRedirect("login.jsp?error=invalid_credentials");
        }
    }

    private boolean checkLogin(String username, String password) {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            Connection con = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);

            PreparedStatement ps = con.prepareStatement("SELECT * FROM [users] WHERE name = ? AND password = ?");
            ps.setString(1, username);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return true;
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
}
