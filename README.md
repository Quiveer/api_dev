# api_dev

USER PROFILE APIs DEVELOPMENT

This project is designed to execute REST API - CRUD  and show how data is transferred through the database to code.

TABLE OF CONTENTS: 

    Requirements
    Project Procedure
    Credits


REQUIREMENTS: 

Framework used is Express js.
Database in action is MySQL.
Nodejs has been used on the server side.
Here are the modules required to be installed: express, mysql and winston.

PROJECT PROCEDURE: 

Once the project is downloaded from Github, open the index.js file in routes folder and connect to MySQL database using the configuration details where MySQL server is already installed. Open Command Prompt and navigate to the project folder. With nodejs installed in machine, install node modules by typing 'npm install express mysql winston'.Then type in 'node app.js' to run the application. When the database is connected, load the url 
'localhost:8000/create-user' to create user profile (GET route),
'localhost:8000/list-user' to list user profile,
'localhost:8000/get-specific-user/:id' to get specific user profile,
'localhost:8000/copied-user-profile' to copy a user profile,
'localhost:8000/update-user/:id' to update user profile (POST route),
'localhost:8000/delete-user/:id' to delete user profile.


Credits:

Built by Samuel W. Njoroge.
