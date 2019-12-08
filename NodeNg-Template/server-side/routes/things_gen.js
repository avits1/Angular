var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('../modules/connection').getConnection();

/* GET things . */
router.get('/', function (req, res, next) {     
  // console.log("NodeJS Server - router.get() - Things Generic List");
  client_response.clear();   
  // con.query("SELECT * FROM things t left join others o on o.jobID = t.jobID left join cars c on c.carID = j.carID", function (err, things, fields) {
  con.query("SELECT * FROM things_gen t ", function (err, things_gen, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "Things generic List - There Was an Error...", err);
          res.json(client_response.getData());
          return;
      }
      client_response.setResponse(true, false, "Things Generic List", things_gen);
      res.json(client_response.getData());
  });
});

// SQL for unattached others:
// 1. Full:
// SELECT * FROM things t LEFT JOIN others o ON  t.id = o.others_id WHERE t.others_id IS NULL

/* GET unattched others. */
router.get('/unattached', function (req, res, next) {         
    var other_id = (req.query.other_id) ? req.query.other_id : 0;        
    client_response.clear();       
    con.query(`SELECT * FROM others o LEFT JOIN things t ON o.id = t.other_id 
                WHERE t.other_id IS NULL OR (t.other_id > 0 AND t.other_id = ?)`,
                 [other_id], function (err, unatt_others, fields) {    
        if (err) {
            console.log(err);
            client_response.setResponse(false, true, "UnAttached Others List - There Was an Error...", err);
            res.json(client_response.getData());
            return;
        }
        client_response.setResponse(true, false, "UnAttached Others List", unatt_others);        
        res.json(client_response.getData());
    });
  });
  
  
// Insert Thing
router.post('/insert', (req, res, next) => {
  var name = (req.body.name) ? req.body.name : "";
  var age = (req.body.age) ? req.body.age : 0;
  var phone = (req.body.phone) ? req.body.phone : "";     
  var smoking = (req.body.smoking) ? req.body.smoking : false;
  var created = (req.body.created) ? req.body.created : Date.now();     

  var err_fields = [];
  if (name == "") {
    err_fields.push("Name is Empty");
  }
  if (age == 0) {
      err_fields.push("Age is Zero");
  }
  if (phone == "") {
    err_fields.push("Phone is Empty");
  }     

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Enter New Thing ...
      var ret = con.query(`INSERT INTO things_gen (name,age,phone,smoking,created) VALUES (?,?,?,?,?)`, [name, age, phone, smoking, created], function (err, things, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding New Thing To DB...", err);
              res.json(client_response.getData());
              return;
          }
        //   console.log("ret con = " + ret);
          client_response.setResponse(true, false, "New Thing Was Added Succesfully", []);
          res.json(client_response.getData());
      });
  }

});


// Delete Thing
router.delete('/delete', function (req, res, next) {
  var err_fields = [];

  var thing_id = (req.body.thing_id) ? req.body.thing_id : 0;

  if (thing_id == 0) {
      err_fields.push("Thing ID is Zero or Empty");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {      
         con.query(`DELETE FROM things_gen Where id = ? `, [thing_id], function (err, things, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "Delete Thing - There Was an Error...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Thing was Deleted...", []);
          res.json(client_response.getData());
      });
  }

});

// Update Thing
router.put('/update', (req, res, next) => {
  var id = (req.body.id) ? req.body.id : 0;
  var name = (req.body.name) ? req.body.name : "";
  var age = (req.body.age) ? req.body.age : 0;
  var phone = (req.body.phone) ? req.body.phone : "";     
  var smoking = (req.body.smoking) ? req.body.smoking : false;
  var created = (req.body.created) ? req.body.created : Date.now();    

  var err_fields = [];
  if (id == 0) {
      err_fields.push("Thing ID NOT Selected");
  }
  if (name == "") {
    err_fields.push("Name is Empty");
  }
  if (age == 0) {
      err_fields.push("Age is Zero");
  }
  if (phone == "") {
    err_fields.push("Phone is Empty");
  }     

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Update Thing ...
      con.query(`UPDATE things SET name=?,age=?,phone=?,smoking=?,created=? WHERE id=?`, [name, age, phone, smoking, created, id], function (err, things, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Thing To DB...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Thing was Updated Succesfully", []);
          res.json(client_response.getData());
      });
  }
});


module.exports = router;
