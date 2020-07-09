const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Logging configuration
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: './index.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})


// DB CONFIGURATION
var myconnection = mysql.createConnection({
  host: "localhost",
  user: "api_dev",
  password: "password",
  database: "user",
  multipleStatements: true
});
myconnection.connect(err => {
  if (!err) {
    logger.info("Database connected");
    console.log("Database connected");

    // CREATE TABLE user
    var sql = 'CREATE TABLE user (id INT(6) AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(55), lastName VARCHAR(55), email VARCHAR(55), phone VARCHAR(55), address VARCHAR(55))';
    myconnection.query(sql, function (err, result) {
      if (err) logger.info(err);
      logger.info("Table user created successfully");
      console.log("Table user created successfully");
    })
  } else {
    logger.info("Error: Unable to connect");
    console.log("Error: Unable to connect");
  }
});

 //Create user profile__GET/POST route
 router.get('/create-user', (req, res) => {
  var newUser = {
    firstName : 'John',
    lastName : 'Doe',
    email : 'email@email.com',
    phone : '0712345678',
    address : '123'
  }

  logger.info(newUser);
  let sql = "INSERT INTO user SET ?";
  let sql1 = "SELECT * FROM user";
  let query = myconnection.query(sql, newUser, (err, user) => {
    if (err) logger.info(`Error: ${err}`);
    let query = myconnection.query(sql1, newUser, (err, user) => {
      if (err) logger.info(`Error: ${err}`);
      res.json(user);
    });
  });
});

//List user profile
  router.get('/list-user', (req, res) => {
    let sql = "SELECT * FROM user";
    let query = myconnection.query(sql, (err, user) => {
      if (err) {
        logger.info(`Error: ${err}`);
      }
      res.json(user);
    });
  });

// Get specific user
   router.get("/get-specific-user/:id", (req, res) => {
    const userId = req.params.id;
    let sql = "SELECT * FROM user WHERE id = ?";
    myconnection.query(sql,[userId], (err, result, fields) => {
      if(err)  logger.info(`Error: ${err}`);
      res.json(result[0]);
    });
  });

// Copy User
  router.get('/copied-user-profile', (req, res) => {
    let sql1 = "CREATE TABLE user2 LIKE user";
    let sql2 = "INSERT INTO user2 SELECT * FROM user";
    let sql3 = "SELECT * FROM user2";
    let query = myconnection.query(sql1, (err, user) => {
      if (err) { logger.info(`sql1 Error: ${err}`); }
      let query = myconnection.query(sql2, (err, user) => {
        if (err) { logger.info(`sql2 Error: ${err}`); }
        let query = myconnection.query(sql3, (err, user) => {
          if (err) { logger.info(`sql3 Error: ${err}`); }
          res.json(user);
        });
      });
    });
  });

// Update user
  router.post("/update-user/:id", (req, res) => {
    const userId = req.params.id;

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let sql = "UPDATE `user` SET `firstName` = '" + firstName + "' `lastName` = '" + lastName + "' `email` = '" + email + "' `phone` = '" + phone + "' `address` = '" + address + "' WHERE `user`.`id` = '" + userId + "'";
    myconnection.query(sql, (err, user) => {
	  if (err) {
      logger.info(`Error: ${err}`);
    }
	  res.json(user);
	});
  });

// Delete user
  router.delete("/delete-user/:id", (req, res) => {
    var userId = req.params.id;
    let sql = 'DELETE FROM user WHERE id = ?';
    myconnection.query(sql,[userId], (err, user) => {
      if (err)  logger.info(`Error: ${err}`);
      res.send('user deleted successfully');
    });
  });
 

module.exports = router;