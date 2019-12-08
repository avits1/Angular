var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('../modules/connection').getConnection();

/* GET products list . */
router.get('/list', function (req, res, next) {     
  // console.log("NodeJS Server - router.get() - products List");
  client_response.clear();     
  con.query("SELECT * FROM products p", function (err, products, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "Products Main List - There Was an Error...", err);
          res.json(client_response.getData());
          return;
      }
      client_response.setResponse(true, false, "Products Main List", products);
      res.json(client_response.getData());
  });
});

// Insert Product
router.post('/insert', (req, res, next) => {
  var name = (req.body.name) ? req.body.name : "";
  var price = (req.body.price) ? req.body.price : 0.0;
  var weight = (req.body.weight) ? req.body.weight : 0.0;
  var color = (req.body.color) ? req.body.color : "";     
  var catalog_num = (req.body.catalog_num) ? req.body.catalog_num : "";     
  
  var err_fields = [];
  if (name == "") {
    err_fields.push("Name is Empty");
  }
  if (price == 0.0) {
      err_fields.push("Price is Zero");
  }
  if (weight == 0.0) {
    err_fields.push("Weight is Zero");
  }
  if (color == "") {
    err_fields.push("Color is Empty");
  }     
  if (catalog_num == "") {
    err_fields.push("Catalog Num is Empty");
  } 

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Enter New Product ...
      var ret = con.query(`INSERT INTO products (name,price,weight,color,catalog_num) VALUES (?,?,?,?,?)`, [name, price, weight, color, catalog_num], function (err, products, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding New Product To DB...", err);
              res.json(client_response.getData());
              return;
          }
        //   console.log("ret con = " + ret);
          client_response.setResponse(true, false, "New Product Was Added Succesfully", []);
          res.json(client_response.getData());
      });
  }
});

// Delete Product
router.delete('/delete', function (req, res, next) {
  var err_fields = [];

  var prod_id = (req.body.prod_id) ? req.body.prod_id : 0;

  if (prod_id == 0) {
      err_fields.push("Product ID is Zero or Empty");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {      
         con.query(`DELETE FROM products Where prod_id = ? `, [prod_id], function (err, products, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "Delete Product - There Was an Error...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Product was Deleted...", []);
          res.json(client_response.getData());
      });
  }
});

// Update Product
router.put('/update', (req, res, next) => {
  var prod_id = (req.body.prod_id) ? req.body.prod_id : 0;
  var name = (req.body.name) ? req.body.name : "";
  var price = (req.body.price) ? req.body.price : 0.0;
  var weight = (req.body.weight) ? req.body.weight : 0.0;
  var color = (req.body.color) ? req.body.color : "";     
  var catalog_num = (req.body.catalog_num) ? req.body.catalog_num : "";   

  var err_fields = [];
  if (prod_id == 0) {
      err_fields.push("Product ID NOT Selected");
  }
  if (name == "") {
    err_fields.push("Name is Empty");
  }
  if (price == 0.0) {
      err_fields.push("Price is Zero");
  }
  if (weight == 0.0) {
    err_fields.push("Weight is Zero");
  }
  if (color == "") {
    err_fields.push("Color is Empty");
  }     
  if (catalog_num == "") {
    err_fields.push("Catalog Num is Empty");
  } 

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Update Product ...
      con.query(`UPDATE products SET name=?,price=?,weight=?,color=?,catalog_num=? WHERE prod_id=?`, [name, price, weight, color, catalog_num, prod_id], function (err, products, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Product To DB...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Product was Updated Succesfully", []);
          res.json(client_response.getData());
      });
  }
});

module.exports = router;