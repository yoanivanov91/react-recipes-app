# Recipes
A simple MERN Stack application about sharing and viewing recipes.

## General information
* This app is about sharing and viewing recipes.
* Guests are only able to see the home page, the recipes page and recipe details page with no functionality.
* Logged in users can add recipes, edit recipes and like recipes of other people.

## Technologies 
* Frontend Framework
    * React
* CSS Framework
    * Bootstrap
* Server
    * Node
    * Express
    * bcrypt
    * cors
    * dotenv
    * jsonwebtoken
    * mongoose
    * nodemon
* Database
    * MongoDB

## Setup
To run this project, in the project directory, you should run:

```
$ npm install
$ npm start
```
Which opens the app at http://localhost:3000 in your browser.
However it will not work until you don't start the RESTful API server.
To start the server you have to be in the project directory and do the following steps:

```
$ cd backend
$ npm install
$ npm start
```

The server will start listening on port 5000.

You will need to use your own MongoDB connection.

The connection string can be changed in /backend/.env