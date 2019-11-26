var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('./../modules/connection').getConnection();
var jwt = require('jsonwebtoken');


// login Bank Client
router.post('/login', (req, res, next) => {
   
    var email = (req.body.email) ? req.body.email : "";
    var password = (req.body.password) ? req.body.password : "";     
  
    var err_fields = [];   
    if (email == "") {
        err_fields.push("Email is Empty");
    }
  
    if (password == "") {
      err_fields.push("Password is Empty");
    }
  
    if (err_fields.length > 0) {
        // something is missing...
        client_response.setResponse(false, false, " something is missing...", err_fields);
        res.json(client_response.getData());
    } else {   
        con.query(`SELECT * FROM clients c WHERE c.email=? AND c.password=?`, [email, password], function (err, client_logins, fields) {
            if (err) {
                console.log(err);
                client_response.setResponse(false, true, "There Was an Error Loginto Bank Client On DB...", err);
                res.json(client_response.getData());
                return;
            }

            if (client_logins.length > 0) { // Login OK

                // JWT HERE:                
                let secret = "myAppSecret@secrettt";
                let payload = {email: email, password: password};
                var token = jwt.sign(payload, secret);
                let arr_token = [token];

                client_response.setResponse(true, false, "bank Client Logined Succesfully", arr_token);
                res.json(client_response.getData());
            }
            else { // Login Failed !
                client_response.setResponse(false, false, "Client failed to login ! ", []);
                res.json(client_response.getData());
            }            
        });
    }        
});


/* GET bank clients. */
router.get('/admin', function (req, res, next) {     
  console.log("NodeJS Server - router.get() - Bank Clients List");
  client_response.clear();   
  if (!req.query.token) {    
    client_response.setResponse(true, false, "Get Clients - no Token Sent", []);
    res.json(client_response.getData());
    return;
  }
    
  let secret = "myAppSecret@secrettt";
  // invalid token - synchronous
  var decoded = {};
  try {
      decoded = jwt.verify(req.query.token, secret);
  } catch (err) {    
      client_response.setResponse(false, true, "Wrong Token, Data Invalid!!", err);
      res.json(client_response.getData());
      return;
  }
//   console.log(decoded);
  client_response.clear();  
//   console.log("router.get - doing SELECT ..");

  // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
  con.query(`SELECT * FROM clients c LEFT JOIN accounts a ON c.account_id = a.id `, function (err, clients, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "There Was an Error...", err);
          res.json(client_response.getData());
          return;
      }
      client_response.setResponse(true, false, "Clients List", clients);
      res.json(client_response.getData());
  });
});


/* GET = Home Page = Bank Clients partial details list. */
router.get('/home', function (req, res, next) {     
    client_response.clear();   
   
    // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
    con.query(`SELECT  c.rec_id, c.client_name , c.phone FROM clients c `, function (err, clients_home, fields) {    
        if (err) {
            console.log(err);
            client_response.setResponse(false, true, "There Was an Error...", err);
            res.json(client_response.getData());
            return;
        }
        client_response.setResponse(true, false, "Clients Home List - Partial", clients_home);
        res.json(client_response.getData());
    });
  });
  
  
// Insert Client
router.put('/insert', (req, res, next) => {
  var client_name = (req.body.client_name) ? req.body.client_name : "";
  var client_id = (req.body.client_id) ? req.body.client_id : 0;
  var phone = (req.body.phone) ? req.body.phone : "";
  var email = (req.body.email) ? req.body.email : "";
  var password = (req.body.password) ? req.body.password : "";
  var account_id = (req.body.account_id) ? req.body.account_id : 0;

  var err_fields = [];
  if (client_name == "") {
      err_fields.push("Client Name is Empty");
  }
  if (client_id == 0) {
      err_fields.push("Client ID/TZ is Zero");
  }
  if (phone == "") {
      err_fields.push("Phone is Empty");
  }
  if (email == "") {
      err_fields.push("Email is Empty");
  }
  if (password == "") {
      err_fields.push("Password is Empty");
}

  // if (account_id == 0) {
  //   err_fields.push("Account ID Not selected");
  // }

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Enter New Bank Client...      
      var ret = con.query(`INSERT INTO clients (client_name,client_id,phone,email,password,account_id) VALUES (?,?,?,?,?,?)`, [client_name, client_id, phone, email, password, account_id], function (err, clients, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding Bank Client To DB...", err);
              res.json(client_response.getData());
              return;
          }          
          client_response.setResponse(true, false, "Bank Client Was Added Succesfully", []);
          res.json(client_response.getData());          
      });
  }


});


// Delete Bank Client
router.delete('/delete', function (req, res, next) {
  var err_fields = [];  
  var recID = (req.body.recID) ? req.body.recID : 0;

  if (recID == 0) {
      err_fields.push("client Record ID NOT Selected");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // con.query(`DELETE FROM users Where userID = ${userID}`, function (err, users, fields) {
         con.query(`DELETE FROM clients Where rec_id = ? `, [recID], function (err, clients, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Bank Client was Deleted...", []);
          res.json(client_response.getData());
      });
  }

});


// Update Bank Client
router.post('/update', (req, res, next) => {  
  var recID = (req.body.recID) ? req.body.recID : 0;
  var client_name = (req.body.client_name) ? req.body.client_name : "";
  var client_id = (req.body.client_id) ? req.body.client_id : 0;
  var phone = (req.body.phone) ? req.body.phone : "";
  var email = (req.body.email) ? req.body.email : "";
  var password = (req.body.password) ? req.body.password : "";  
  var account_id = (req.body.account_id) ? req.body.account_id : 0;  

  var err_fields = [];
  if (recID == 0) {
      err_fields.push("Client Record ID NOT Selected");
  }
  if (client_name == "") {
      err_fields.push("Client Name is Empty");
  }
  if (client_id == 0) {
      err_fields.push("Client ID/TZ is Empty");
  }
  if (phone == "") {
      err_fields.push("Phone is Empty");
  }
  if (email == "") {
      err_fields.push("Email is Empty");
  }
  if (password == "") {
    err_fields.push("Password is Empty");
    }

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Update Bank Client ...
      con.query(`UPDATE clients SET client_name=?,client_id=?,phone=?,email=?,password=?,account_id=? WHERE rec_id=?`, [client_name, client_id, phone, email, password, account_id, recID], function (err, clients, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Bank Client To DB...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "bank Client was Updated Succesfully", []);
          res.json(client_response.getData());
      });
  }

});

module.exports = router;
