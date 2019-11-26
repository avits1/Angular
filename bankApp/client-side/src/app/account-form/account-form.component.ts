import { Component, OnInit } from '@angular/core';
import { AccountsDataService } from '../accounts-data.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  
  bank = null;
  branch = null;
  acc_num = "";
  amount = 0;
  credit = 0;  
  rec_id = 0;

  updated_id = "";
  new_account = {};

  constructor(private accountsService: AccountsDataService,
                   private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
        
    this.updated_id = this.route.snapshot.paramMap.get('id');         
    if (this.updated_id != null) {
      this.rec_id = parseInt(this.updated_id); // also: Number()   
    }        
    if (this.rec_id > 0) {
      let to_update = this.accountsService.getAccountByID(this.rec_id);
      // console.log("got object account number:" + to_update.acc_num);
      if (to_update == null) {
        console.log("get account details by its ID - Failed !");
        return;
      }  
      // Fill The Form 
      this.bank = to_update.bank;
      this.branch = to_update.branch;
      this.acc_num = to_update.acc_num;
      this.amount = to_update.amount;
      this.credit = to_update.credit;      
      this.rec_id = to_update.id;           
    }       
  }
  
  updateAccount() {
    if (this.rec_id < 1) {
      console.log("updateAccount - Can't update account id 0");
      alert("updateAccount - Can't update account id 0");
      this.clearForm();
      return;
    }   
    let account_data = {
        id: this.rec_id,
        bank: this.bank,
        branch: this.branch,
        acc_num: this.acc_num,
        amount: this.amount,
        credit: this.credit
    };    
    this.accountsService.updateAccountData(account_data);
    console.log("updateAccount - updating account " + account_data.acc_num);
    this.clearForm();   
    this.router.navigateByUrl('/accounts-comp'); // redirect back to accounts list/cubes
  }

  // Add Account !
  saveAccount() {     
    if (this.bank == 0 || this.branch == 0 || this.acc_num == "" 
          || this.amount == 0 || this.credit == 0) {
      console.log("saveAccount - missing values. can't save .. ");
      alert("saveAccount - missing values. can't save .. ");
      return;
    }
    console.log("saveAccount - started  for account num: " + this.acc_num);
    this.new_account = {
      id: 0, // Auto INC by DB !
      bank: this.bank,      
      branch: this.branch,
      acc_num: this.acc_num,
      amount: this.amount,
      credit: this.credit
    };        
    this.accountsService.addAccountData(this.new_account);
    this.clearForm();
    this.new_account={};    
    this.router.navigateByUrl('/accounts-comp'); // redirect to accounts list/cubes
  }  

  clearForm() {
    this.bank = null;
    this.branch = null;    
    this.acc_num = "";
    this.amount = 0;
    this.credit = 0;   
    this.rec_id = 0;
  }

}
