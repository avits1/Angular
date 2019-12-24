var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('../modules/connection').getConnection();

/* GET things . */
router.get('/', function (req, res, next) {     
  console.log("NodeJS Server - router.get() - Things Generic List");
  client_response.clear();   
  // con.query("SELECT * FROM things t left join others o on o.jobID = t.jobID left join cars c on c.carID = j.carID", function (err, things, fields) {
  con.query("SELECT * FROM things_gen t ", function (err, things_gen, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "Things generic List - There Was an Error...", err);
          res.status(500).json(client_response.getData()); // Status Code: 500 - Server Error         
          return;
      }
      client_response.setResponse(true, false, "Things Generic List", things_gen);
      res.status(things_gen.length?200:204).json(client_response.getData()); // Status Code: 200 - OK, 204 - Empty data
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
            res.status(500).json(client_response.getData()); // Status Code: 500 - Server Error
            return;
        }
        client_response.setResponse(true, false, "UnAttached Others List", unatt_others);        
        res.status(unatt_others.length?200:204).json(client_response.getData()); // Status Code: 200 - OK, 204 - Empty data
    });
  });
  
  
// Insert Thing
// router.post('/insert', (req, res, next) => {
router.post('/', (req, res, next) => {  
  var name = (req.body.name) ? req.body.name : "";
  var age = (req.body.age) ? req.body.age : 0;
  var phone = (req.body.phone) ? req.body.phone : "";     
  var smoking = (req.body.smoking) ? req.body.smoking : false;
  var created = (req.body.created) ? req.body.created : Date.now();     

  // var created_date = new Date();    
  // var created_str = created_date.toString();   

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
      res.status(400).json(client_response.getData()); // Status Code : 400 - BAD REQUEST
  } else {
      // Enter New Thing ...
      var ret = con.query(`INSERT INTO things_gen (name,age,phone,smoking,created) VALUES (?,?,?,?,?)`, [name, age, phone, smoking, created], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding New Thing To DB...", err);
              res.status(500).json(client_response.getData()); // Status Code: 500 - Server Error
              return;
          }        
          if (result.affectedRows > 0) {
            client_response.setResponse(true, false, "New Thing Was Added Succesfully", []);
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

  var thing_id = (req.body.thing_id) ? req.body.thing_id : 0;

  if (thing_id == 0) {
      err_fields.push("Thing ID is Zero or Empty");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.status(400).json(client_response.getData()); // Status Code : 400 - BAD REQUEST
  } else {      
         con.query(`DELETE FROM things_gen Where id = ? `, [thing_id], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "Delete Thing - There Was an Error...", err);
              res.status(500).json(client_response.getData()); // Status Code: 500 - Server Error
              return;
          }
          if (result.affectedRows > 0) {
            client_response.setResponse(true, false, "One Thing was Deleted...", []);
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
      res.status(400).json(client_response.getData()); // Status Code : 400 - BAD REQUEST
  } else {
      // Update Thing ...
      con.query(`UPDATE things SET name=?,age=?,phone=?,smoking=?,created=? WHERE id=?`, [name, age, phone, smoking, created, id], function (err, result, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Thing To DB...", err);
              res.status(500).json(client_response.getData()); // Status Code: 500 - Server Error
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
