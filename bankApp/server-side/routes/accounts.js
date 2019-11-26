var express = require('express');
var router = express.Router();
var client_response = require('../modules/client_response');
var con = require('./../modules/connection').getConnection();

/* GET bank accounts. */
router.get('/', function (req, res, next) {     
  console.log("NodeJS Server - router.get() - Bank Accounts List");
  client_response.clear();   
  // con.query("SELECT * FROM users u left join jobs j on j.jobID = u.jobID left join cars c on c.carID = j.carID", function (err, users, fields) {
  con.query("SELECT * FROM accounts a ", function (err, accounts, fields) {    
      if (err) {
          console.log(err);
          client_response.setResponse(false, true, "Account List - There Was an Error...", err);
          res.json(client_response.getData());
          return;
      }
      client_response.setResponse(true, false, "Bank Accounts List", accounts);
      res.json(client_response.getData());
  });
});

// SQL for unattached acounts:
// 1. Full:
// SELECT * FROM accounts a LEFT JOIN clients c ON  a.id = c.account_id WHERE c.account_id IS NULL
// 2. minimized:
// SELECT a.id, c.account_id FROM accounts a LEFT JOIN clients c ON  a.id = c.account_id  WHERE  c.account_id IS NULL

/* GET unattched bank accounts. */
router.get('/unattached', function (req, res, next) {         
    var account_id = (req.query.account_id) ? req.query.account_id : 0;        
    client_response.clear();       
    con.query(`SELECT * FROM accounts a LEFT JOIN clients c ON a.id = c.account_id 
                WHERE c.account_id IS NULL OR (c.account_id > 0 AND c.account_id = ?)`,
                 [account_id], function (err, unaccounts, fields) {    
        if (err) {
            console.log(err);
            client_response.setResponse(false, true, "UnAttached Account List - There Was an Error...", err);
            res.json(client_response.getData());
            return;
        }
        client_response.setResponse(true, false, "UnAttached Bank Accounts List", unaccounts);        
        res.json(client_response.getData());
    });
  });
  
  
// Insert Bank Account
router.put('/insert', (req, res, next) => {
  var bank = (req.body.bank) ? req.body.bank : 0;
  var branch = (req.body.branch) ? req.body.branch : 0;
  var acc_num = (req.body.acc_num) ? req.body.acc_num : "";
  var amount = (req.body.amount) ? req.body.amount : 0;
  var credit = (req.body.credit) ? req.body.credit : 0;

  var err_fields = [];
  if (bank == 0) {
      err_fields.push("Bank Number is Zero");
  }
  if (branch == 0) {
      err_fields.push("Branch Number is Zero");
  }
  if (acc_num == "") {
      err_fields.push("Account Number is Empty");
  }
  if (amount == 0) {
      err_fields.push("Amount is Zero");
  }

  if (credit == 0) {
    err_fields.push("Account Credit is Zero");
  }  

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Enter New Bank Account...
      var ret = con.query(`INSERT INTO accounts (bank,branch,acc_num,amount,credit) VALUES (?,?,?,?,?)`, [bank, branch, acc_num, amount, credit], function (err, accounts, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Adding Bank Account To DB...", err);
              res.json(client_response.getData());
              return;
          }
        //   console.log("ret con = " + ret);
          client_response.setResponse(true, false, "Bank Account Was Added Succesfully", []);
          res.json(client_response.getData());
      });
  }

});


// Delete Bank Client
router.delete('/delete', function (req, res, next) {
  var err_fields = [];

  var account_id = (req.body.account_id) ? req.body.account_id : 0;

  if (account_id == 0) {
      err_fields.push("Account ID is Zero or Empty");
  }

  client_response.clear();
  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {      
         con.query(`DELETE FROM accounts Where id = ? `, [account_id], function (err, accounts, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "Delete Account - There Was an Error...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Bank Account was Deleted...", []);
          res.json(client_response.getData());
      });
  }

});

// Update Bank Account
router.post('/update', (req, res, next) => {
  var id = (req.body.id) ? req.body.id : 0;
  var bank = (req.body.bank) ? req.body.bank : 0;
  var branch = (req.body.branch) ? req.body.branch : 0;
  var acc_num = (req.body.acc_num) ? req.body.acc_num : "";
  var amount = (req.body.amount) ? req.body.amount : 0;
  var credit = (req.body.credit) ? req.body.credit : 0;    

  var err_fields = [];
  if (id == 0) {
      err_fields.push("Account ID NOT Selected");
  }
  if (bank == 0) {
      err_fields.push("Bank ID is Empty");
  }
  if (branch == 0) {
      err_fields.push("Branch ID is Empty");
  }
  if (acc_num == "") {
      err_fields.push("Account Num is Empty");
  }
  if (amount == 0) {
      err_fields.push("Amount is Empty Or Zero");
  }
  if (credit == 0) {
    err_fields.push("Account Credit is Empty Or Zero");
  }  

  if (err_fields.length > 0) {
      // something is missing...
      client_response.setResponse(false, false, " something is missing...", err_fields);
      res.json(client_response.getData());
  } else {
      // Update Bank Account ...
      con.query(`UPDATE accounts SET bank=?,branch=?,acc_num=?,amount=?,credit=? WHERE id=?`, [bank, branch, acc_num, amount, credit, id], function (err, accounts, fields) {
          if (err) {
              console.log(err);
              client_response.setResponse(false, true, "There Was an Error Updating Bank Account To DB...", err);
              res.json(client_response.getData());
              return;
          }
          client_response.setResponse(true, false, "Bank Account was Updated Succesfully", []);
          res.json(client_response.getData());
      });
  }

});


module.exports = router;
