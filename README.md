# Web Programming

## 1. Diply Clone (HTML + CSS)

Develop a HTML + CSS web document that looks like the following web page: https://diply.com/. You should clone about one screen of this web page (not the whole web page) and your html document should look approximately 90% as the given web page. No interactivity should be added (e.g. javascript, :hover effects etc.); you are not allowed to use any css or javascript library.

## 2. Puzzle (Javascript)

Write a Javascript web page which displays a 3X3 matrix representing the parts of a puzzle (a big image). The user must be able to interchange the cells of the matrix (i.e., the images from the matrix's cells) so that he solves the puzzle. When the user solves the puzzle (constructs correctly the big image) the message "Well done!" will be displayed.

## 3. Highlight Words (jQuery)

Write a web page using only the jQuery library which contains some text. When the user selects a word from the web page (by double clicking it), all the occurrences of this word should be highlighted with a different background.

## 4. Battleship Game (JSP)

Develop a web application based on JSP (Java Server Pages) or Java Servlets which allows two (human) players to play the game **_Battleship_**: each player has 2 ships deployed in a rectangular grid and they each try to sink the oponent's ships by bombing it (guessing the position of the ship on the battle grid). The game can not start unless two playes are connected. If a third player comes in, it will be rejected from the game with an error message.

All web pages should be accessible only if the user logs in using a username and a password (create a session each time a user logs in, and destroy the session when the user logs out). Have in mind the user experience when you implement the problem:

-   Add different validation logic for input fields
-   Do not force the user to input an ID for an item if he wants to delete/edit/insert it; this should happen automatically (e.g. the user clicks an item from a list, and a page/modal prepopulated with the data for that particular item is opened, where the user can edit it)
-   Add confirmation when the user deletes/cancels an item
-   Do a bare minimum CSS that at least aligns the various input fields
-   State information (between web requests) is always stored in a database; you may store some state information in cookies/session objects.

## 5. Vacation Destinations (PHP + HTML)

Develop a server-side web application in PHP for managing vacation destinations. A destination has in the database besides the name of the location (i.e. city etc.), the country name, description, tourist targets in that location an an estimated cost per day. The user can add, delete or modify the destinations and he can also browse the vacation destinations grouped by countries (use AJAX for this). Vacation destination browsing should be paged - destinations are displayed on pages with maximum 4 vacation destinations on a page (you should be able to go to the previous and the next page). The web application has to manipulate a Mysql database with 1 to 3 tables and should implement the following base operations on these tables: select, insert, delete, update. Also the web application must use AJAX for getting data asynchronously from the web server and the web application should contain at least 5 web pages (client-side html or server-side php).

Make sure that you avoid sql-injection attacks when working with the database.
Have in mind the user experience when you implement the problem:

-   Add different validation logic for input fields
-   Do not force the user to input an ID for an item if he wants to delete/edit/insert it; this should happen automatically (e.g. the user clicks an item from a list, and a page/modal prepopulated with the data for that particular item is opened, where the user can edit it)
-   Add confirmation when the user deletes/cancels an item
-   Do a bare minimum CSS that at least aligns the various input fields

## 6. Vacation Destinations (PHP + Angular)

Develop an Angular UI (user interface) with Typescript for the PHP application Vacation Destinations.

## 7. Vacation Destinations (ASP.NET + Angular)

Develop a WEB API for managing vacation destinations using ASP .NET technology. A destination has in the database besides the name of the location (i.e. city etc.), the country name, description, tourist targets in that location an an estimated cost per day. The user can add, delete or modify the destinations and he can also browse the vacation destinations grouped by countries (use AJAX for this). Vacation destination browsing should be paged - destinations are displayed on pages with maximum 4 vacation destinations on a page (you should be able to go to the previous and the next page). The web application has to manipulate a Mysql database with 1 to 3 tables and should implement the following base operations on these tables: select, insert, delete, update. Your application must implement user authentication and ask the user to authenticate himself/herself prior to actually using the web application (based on an username and password saved in the database).

Add a middleware layer for user authentication.

Make sure that you avoid sql-injection attacks when working with the database.
Have in mind the user experience when you implement the problem:

-   Add different validation logic for input fields
-   Do not force the user to input an ID for an item if he wants to delete/edit/insert it; this should happen automatically (e.g. the user clicks an item from a list, and a page/modal prepopulated with the data for that particular item is opened, where the user can edit it)
-   Add confirmation when the user deletes/cancels an item
-   Do a bare minimum CSS that at least aligns the various input fields
