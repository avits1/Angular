import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsDataService {

  // Observeble Service Message:
  private msgAccountsSource = new BehaviorSubject('DEFAULT'); // default message
  currAccountMsg = this.msgAccountsSource.asObservable();

  changeAccountMessage(account_msg: string) {
    this.msgAccountsSource.next(account_msg)
  }

  newMsgForAccounts(msg) {    
    this.changeAccountMessage(msg);    
  }

  unattached_accounts_url = "http://localhost:3000/accounts/unattached"; // GET
  get_accounts_url = "http://localhost:3000/accounts"; // GET
  delete_account_url = "http://localhost:3000/accounts/delete"; // DELETE
  insert_account_url = "http://localhost:3000/accounts/insert"; // PUT  
  update_account_url = "http://localhost:3000/accounts/update"; // POST

  accounts = [];
  unattached_accounts = [];

  constructor() { }

  getUnattachedAccounts(){
    return this.unattached_accounts;
  }
  
  fetchUnattachedAccounts(my_account){
    let temp_url = this.unattached_accounts_url + "/?account_id=" + my_account;
    fetch(temp_url, {
    // fetch(this.unattached_accounts_url, {      
      method: "GET",
      // body: JSON.stringify({account_id: my_account}),      
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {    
        this.unattached_accounts = res.data;
        // console.log("fetchUnattachedAccounts - fetch retrived un attached accounts:");
        // console.log(this.unattached_accounts);
        this.newMsgForAccounts("UNATTACHED ACC. UPDATED"); // un-attached accounts are updated
    })
    .catch(err => {
        console.log("fetchUnattachedAccounts - fetch Error occured !");
        console.log(err);              
    })
  }


  delAccountData(aid) {        
    fetch(this.delete_account_url, {
        method: "DELETE",
        body: JSON.stringify({account_id: aid}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {    
          // let del_msg = res.data;
          // console.log("delAccountData - fetch deleted account with Id:" + aid);
          // console.log(del_msg);
          this.fetchAllAccounts();          
          this.fetchUnattachedAccounts(0);
      })
      .catch(err => {
          console.log("delAccountData - fetch delete Error occured !");
          console.log(err);              
      })
  }

  getAllAccounts(){    
    return this.accounts;
  }
    
  fetchAllAccounts(){
    fetch(this.get_accounts_url)
        .then((res) => { return res.json(); })
        .then((res) => {    
            this.accounts = res.data;
            // console.log("fetchAllAccounts - fetch retrived all accounts:");
            // console.log(this.accounts);
            this.newMsgForAccounts("ACCOUNTS-TABLE UPDATED"); // accounts are updated            
        })
        .catch(err => {
            console.log("fetchAllAccounts - fetch Error occured !");
            console.log(err);              
        })
  }

  getAccountByID(aid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.accounts.length; idx++) {
      if (aid == this.accounts[idx].id) {
        to_update = this.accounts[idx];
        return to_update;
      }
    }
    return null;
  }
  
  addAccountData(new_account) {                
    // console.log("addAccountData - started for account: " + new_account.bank
    //        + " | " + new_account.branch + " | " +  new_account.acc_num);
    fetch(this.insert_account_url, {
      method: "PUT",  
      body: JSON.stringify({
          id: 0, // Auto INC by DB !
          bank: new_account.bank,      
          branch: new_account.branch,
          acc_num: new_account.acc_num,
          amount: new_account.amount,
          credit: new_account.credit }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {    
        // let add_msg = res.message;
        // console.log("addAccountData - fetch added new account");
        // console.log(add_msg);
        this.fetchAllAccounts();        
        this.fetchUnattachedAccounts(0);
    })
    .catch(err => {
        console.log("addAccountData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  
  updateAccountData(account_data) {    
    
    fetch(this.update_account_url, {
      method: "POST",  
      body: JSON.stringify({
        id: account_data.id, 
        bank: account_data.bank,      
        branch: account_data.branch,
        acc_num: account_data.acc_num,
        amount: account_data.amount,
        credit: account_data.credit }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {            
        // let update_msg = res.message;        
        // console.log(update_msg);
        this.fetchAllAccounts();        
        this.fetchUnattachedAccounts(0);
    })
    .catch(err => {
        console.log("updateAccountData - fetch update Error occured !");
        console.log(err);              
    })
  }

}
