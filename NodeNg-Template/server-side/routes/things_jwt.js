var express = require('express');
var router = express.Router();
var thing_response = require('../modules/thing_response');
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
        thing_response.setResponse(false, false, " something is missing...", err_fields);
        res.json(thing_response.getData());
    } else {   
        con.query(`SELECT * FROM things t WHERE t.email=? AND t.password=?`, [email, password], function (err, things_logins, fields) {
            if (err) {
                console.log(err);
                thing_response.setResponse(false, true, "There Was an Error Login to Thing On DB...", err);
                res.json(thing_response.getData());
                return;
            }

            if (things_logins.length > 0) { // Login OK

                // JWT HERE:                
                let secret = "myAppSecret@secrettt";
                let payload = {email: email, password: password};
                var token = jwt.sign(payload, secret);
                let arr_token = [token];

                thing_response.setResponse(true, false, "Thing Logined Succesfully", arr_token);
                res.json(thing_response.getData());
            }
            else { // Login Failed !
                thing_response.setResponse(false, false, "Thing failed to login ! ", []);
                res.json(thing_response.getData());
            }            
        });
    }        
});


/* GET things. */
router.get('/admin', function (req, res, next) {     
//   console.log("NodeJS Server - router.get() - Things List");
  thing_response.clear();   
  if (!req.query.token) {    
    thing_response.setResponse(true, false, "Get Things - no Token Sent", []);
    res.json(thing_response.getData());
    return;
  }
    
  let secret = "myAppSecret@secrettt";
  // invalid token - synchronous
  var decoded = {};
  try {
      decoded = jwt.verify(req.query.token, secret);
  } catch (err) {    
      thing_response.setResponse(false, true, "Wrong Token, Data Invalid!!", err);
      res.json(thing_response.getData());
      return;
  }
//   console.log(decoded);
  thing_response.clear();  
//   console.log("router.get - doing SELECT ..");

  // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
  con.query(`SELECT * FROM things t LEFT JOIN others o ON t.thing_id = o.id `, function (err, things, fields) {    
      if (err) {
          console.log(err);
          thing_response.setResponse(false, true, "There Was an Error...", err);
          res.json(thing_response.getData());
          return;
      }
      thing_response.setResponse(true, false, "Things List", things);
      res.json(thing_response.getData());
  });
});


/* GET = Home Page = things partial details list. */
router.get('/home', function (req, res, next) {     
    thing_response.clear();   
   
    // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
    con.query(`SELECT  t.rec_id, t.name , t.phone FROM things t `, function (err, thingss_home, fields) {    
        if (err) {
            console.log(err);
            thing_response.setResponse(false, true, "There Was an Error...", err);
            res.json(thing_response.getData());
            return;
        }
        thing_response.setResponse(true, false, "Things Home List - Partial", things_home);
        res.json(thing_response.getData());
    });
  });
  
  
// Insert Thing
router.put('/insert', (req, res, next) => {
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
      thing_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(thing_response.getData());
  } else {
      // Enter New Thing...      
      var ret = con.query(`INSERT INTO things (thing_name,thing_id,phone,email,password,other_id) VALUES (?,?,?,?,?,?)`, [thing_name, thing_id, phone, email, password, other_id], function (err, things, fields) {
          if (err) {
              console.log(err);
              thing_response.setResponse(false, true, "There Was an Error Adding Thing To DB...", err);
              res.json(thing_response.getData());
              return;
          }          
          thing_response.setResponse(true, false, "Thing Was Added Succesfully", []);
          res.json(thing_response.getData());          
      });
  }


});


// Delete Thing
router.delete('/delete', function (req, res, next) {
  var err_fields = [];  
  var recID = (req.body.recID) ? req.body.recID : 0;

  if (recID == 0) {
      err_fields.push("thing Record ID NOT Selected");
  }

  thing_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      thing_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(thing_response.getData());
  } else {
      // con.query(`DELETE FROM users Where userID = ${userID}`, function (err, users, fields) {
         con.query(`DELETE FROM things Where rec_id = ? `, [recID], function (err, things, fields) {
          if (err) {
              console.log(err);
              thing_response.setResponse(false, true, "There Was an Error...", err);
              res.json(thing_response.getData());
              return;
          }
          thing_response.setResponse(true, false, "Bank Thing was Deleted...", []);
          res.json(thing_response.getData());
      });
  }
});

// Update Thing
router.post('/update', (req, res, next) => {  
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
      thing_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(thing_response.getData());
  } else {
      // Update Thing ...
      con.query(`UPDATE things SET thing_name=?,thing_id=?,phone=?,email=?,password=?,other_id=? WHERE rec_id=?`, [thing_name, thing_id, phone, email, password, other_id, recID], function (err, things, fields) {
          if (err) {
              console.log(err);
              thing_response.setResponse(false, true, "There Was an Error Updating Thing To DB...", err);
              res.json(thing_response.getData());
              return;
          }
          thing_response.setResponse(true, false, "Thing was Updated Succesfully", []);
          res.json(thing_response.getData());
      });
  }

});

module.exports = router;
