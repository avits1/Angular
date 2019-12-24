var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('../modules/connection').getConnection();
var jwt = require('jsonwebtoken');


// login Thing
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
        res.status(400).json(client_response.getData());
    } else {   
        con.query(`SELECT * FROM things t WHERE t.email=? AND t.password=?`, [email, password], function (err, things_logins, fields) {
            if (err) {
                console.log(err);
                client_response.setResponse(false, true, "There Was an Error Login to Thing On DB...", err);
                res.status(500).json(client_response.getData());
                return;
            }

            if (things_logins.length > 0) { // Login OK

                // JWT HERE:                
                let secret = "myAppSecret@secrettt";
                let payload = {email: email, password: password};
                var token = jwt.sign(payload, secret);
                let arr_token = [token];

                client_response.setResponse(true, false, "Thing Logined Succesfully", arr_token);
                res.status(200).json(client_response.getData());
            }
            else { // Login Failed !
                client_response.setResponse(false, false, "Thing failed to login ! ", []);
                res.status(401).json(client_response.getData()); /// code 401 - Unauthorized // 403 - Forbidden
            }            
        });
    }        
});


/* GET things. */
router.get('/admin', function (req, res, next) {     
//   console.log("NodeJS Server - router.get() - Things List");
  client_response.clear();   
  if (!req.query.token) {    
    client_response.setResponse(true, false, "Get Things - no Token Sent", []);
    res.status(400).json(client_response.getData());
    return;
  }
    
  let secret = "myAppSecret@secrettt";
  // invalid token - synchronous
  var decoded = {};
  try {
      decoded = jwt.verify(req.query.token, secret);
  } catch (err) {    
      client_response.setResponse(false, true, "Wrong Token, Data Invalid!!", err);
      res.status(400).json(client_response.getData());
      return;
  }
//   console.log(decoded);
  client_response.clear();  
//   console.log("router.get - doing SELECT ..");

  // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
  con.query(`SELECT * FROM things t LEFT JOIN others o ON t.thing_id = o.id `, function (err, things, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "There Was an Error...", err);
          res.status(500).json(client_response.getData());
          return;
      }
      client_response.setResponse(true, false, "Things List", things);
      res.status(things.length?200:204).json(client_response.getData());
  });
});


/* GET = Home Page = things partial details list. */
router.get('/home', function (req, res, next) {     
    client_response.clear();   
   
    // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
    con.query(`SELECT  t.rec_id, t.name , t.phone FROM things t `, function (err, things_home, fields) {    
        if (err) {
            console.log(err);
            client_response.setResponse(false, true, "There Was an Error...", err);
            res.status(500).json(client_response.getData());
            return;
        }
        client_response.setResponse(true, false, "Things Home List - Partial", things_home);
        res.status(things_home.length?200:204).json(client_response.getData());
    });
  });
  
  
// Insert Thing
// router.post('/insert', (req, res, next) => {
router.post('/', (req, res, next) => {    
  var thing_name = (req.body.thing_name) ? req.body.thing_name : "";
  var thing_id = (req.body.thing_id) ? req.body.thing_id : 0;
  var phone = (req.body.phone) ? req.body.phone : "";
  var email = (req.body.email) ? req.body.email : "";
  var password = (req.body.password) ? req.body.password : "";
  var other_id = (req.body.other_id) ? req.body.other_id : 0;

  var err_fields = [];
  if (thing_name == "") {
      err_fields.push("Thing Name is Empty");
  }
  if (thing_id == 0) {
      err_fields.push("Thing ID/TZ is Zero");
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
      res.status(400).json(client_response.getData());
  } else {
      // Enter New Thing...      
      var ret = con.query(`INSERT INTO things (thing_name,thing_id,phone,email,password,other_id) VALUES (?,?,?,?,?,?)`, [thing_name, thing_id, phone, email, password, other_id], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding Thing To DB...", err);
              res.status(500).json(client_response.getData());
              return;
          }          
          if (result.affectedRows > 0) {
            client_response.setResponse(true, false, "Thing Was Added Succesfully", []);
            res.status(200).json(client_response.getData());          
            return;
          }
          client_response.setResponse(false, false, "Can't Add New Thing - Check Data !", []);
          res.status(500).json(client_response.getData());          
      });
  }


});


// Delete Thing
// router.delete('/delete', function (req, res, next) {
router.delete('/', function (req, res, next) {    
  var err_fields = [];  
  var recID = (req.body.recID) ? req.body.recID : 0;

  if (recID == 0) {
      err_fields.push("thing Record ID NOT Selected");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.status(400).json(client_response.getData());
  } else {
      // con.query(`DELETE FROM users Where userID = ${userID}`, function (err, users, fields) {
         con.query(`DELETE FROM things Where rec_id = ? `, [recID], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error...", err);
              res.status(500).json(client_response.getData());
              return;
          }
          if (result.affectedRows > 0) {
            client_response.setResponse(true, false, "Bank Thing was Deleted...", []);
            res.status(200).json(client_response.getData());
            return;
          }        
          client_response.setResponse(false, false, "NO Thing To Delete !", []);
          res.status(500).json(client_response.getData());
      });
  }
});

// Update Thing
// router.put('/update', (req, res, next) => {  
router.put('/', (req, res, next) => {      
  var recID = (req.body.recID) ? req.body.recID : 0;
  var thing_name = (req.body.thing_name) ? req.body.thing_name : "";
  var thing_id = (req.body.thing_id) ? req.body.thing_id : 0;
  var phone = (req.body.phone) ? req.body.phone : "";
  var email = (req.body.email) ? req.body.email : "";
  var password = (req.body.password) ? req.body.password : "";  
  var other_id = (req.body.other_id) ? req.body.other_id : 0;  

  var err_fields = [];
  if (recID == 0) {
      err_fields.push("Thing Record ID NOT Selected");
  }
  if (thing_name == "") {
      err_fields.push("Thing Name is Empty");
  }
  if (thing_id == 0) {
      err_fields.push("Thing ID/TZ is Empty");
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
      res.status(400).json(client_response.getData());
  } else {
      // Update Thing ...
      con.query(`UPDATE things SET thing_name=?,thing_id=?,phone=?,email=?,password=?,other_id=? WHERE rec_id=?`, [thing_name, thing_id, phone, email, password, other_id, recID], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Thing To DB...", err);
              res.status(500).json(client_response.getData());
              return;
          }
          if (result.affectedRows > 0) {
            client_response.setResponse(true, false, "Thing was Updated Succesfully", []);
            res.status(200).json(client_response.getData());
            return;
          }
          client_response.setResponse(false, false, "NO Thing To Update !", []);
          res.status(500).json(client_response.getData()); 
      });
  }

});

module.exports = router;
