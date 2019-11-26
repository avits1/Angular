import { Injectable } from '@angular/core';
import { AccountsDataService } from './accounts-data.service';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
// import { Routes, RouterModule } from '@angular/router';

// From: https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

// export class DataService {

//   private msgMovieSource = new BehaviorSubject('no movies'); // default message
//   currMovieMsg = this.msgMovieSource.asObservable();

//   constructor() { }

//   changeMovieMessage(message: string) {
//     this.msgMovieSource.next(message)
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class ClientsDataService {

  // Observeble Service Message:
  private msgClientSource = new BehaviorSubject('DEFAULT'); // default message
  currClientMsg = this.msgClientSource.asObservable();

  changeClientMessage(client_msg: string) {
    this.msgClientSource.next(client_msg)
  }

  newMsgForClients(msg) {    
    this.changeClientMessage(msg);    
  }

  clients = [];
  clients_home = [];
  token = "";
  
  admin_clients_url = "http://localhost:3000/clients/admin"; // GET (Admin Only)
  insert_clients_url = "http://localhost:3000/clients/insert"; // PUT
  delete_clients_url = "http://localhost:3000/clients/delete"; // DELETE
  update_clients_url = "http://localhost:3000/clients/update"; // POST
  login_clients_url = "http://localhost:3000/clients/login"; // LOGIN BY POST
  home_clients_url = "http://localhost:3000/clients/home"; // LIST /Partial (Home page)

  constructor(private accountService: AccountsDataService, private router: Router) { }
  
  updateClientData(client_data) {    
    // console.log("updateClientData - fetch started for client " + client_data.client_name + " !");
    fetch(this.update_clients_url, {
      method: "POST",  
      body: JSON.stringify({
              recID: client_data.recID,
              client_name: client_data.client_name,      
              client_id: client_data.client_id, // ID = TZ
              phone: client_data.phone,
              email: client_data.email,
              password: client_data.password,
              account_id: client_data.account_id }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {            
        // let update_msg = res.message;        
        // console.log(update_msg);
        this.fetchAllClients();        
        this.accountService.fetchUnattachedAccounts(0);
    })
    .catch(err => {
        console.log("updateClientData - fetch update Error occured !");
        console.log(err);              
    })
  }
  
  delClientData(cid) {        
    fetch(this.delete_clients_url, {
        method: "DELETE",        
        body: JSON.stringify({recID: cid}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {    
          // let del_msg = res.message;
          // console.log("delClientData - fetch deleted client with Id:" + cid);
          // console.log(del_msg);
          this.fetchAllClients();          
          this.accountService.fetchUnattachedAccounts(0);
      })
      .catch(err => {
          console.log("delClientData - fetch delete Error occured !");
          console.log(err);              
      })
  }

  getListPartial(){    
    return this.clients_home;
  }
    
  fetchListPartial(){
    fetch(this.home_clients_url)
        .then((res) => { return res.json(); })
        .then((res) => {    
            this.clients_home = res.data;
            // console.log("fetchListPartial - fetch retrived partial clients:");
            // console.log(this.clients_home);            
            this.newMsgForClients("HOME CLIENTS-PARTIAL UPDATED"); // home table is updated
        })
        .catch(err => {
            console.log("fetchListPartial - fetch Error occured !");
            console.log(err);              
        })
  } 

  getAllClients(){    
    return this.clients;
  }
    
  fetchAllClients(){
    // console.log("fetchAllClients - started !")
    let admin_url = this.admin_clients_url + "/?token=" + this.token;
    fetch(admin_url)
        .then((res) => { return res.json(); })
        .then((res) => {                
            this.clients = res.data;
            // console.log("fetchAllClients - fetch retrived all clients:");
            // console.log(this.clients);            
            if (this.clients.length > 0)
              this.newMsgForClients("CLIENTS-TABLE UPDATED"); // table is updated
            else {
              // navigate to login
              alert("UNKNOWN USER ! redirect to login");
              this.router.navigateByUrl('/login-form');
            }  
        })
        .catch(err => {
            console.log("fetchAllClients - fetch Error occured !");
            console.log(err);              
        })
  } 
  
  addClientData(new_client) {                
    // console.log("addClientData - fetch started !")

    fetch(this.insert_clients_url, {
      method: "PUT",  
      body: JSON.stringify({
              id: 0, // Auto INC by DB !
              client_name: new_client.client_name,      
              client_id: new_client.client_id, // ID = TZ
              phone: new_client.phone,
              email: new_client.email,
              password: new_client.password,
              account_id: new_client.account_id }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {    
        // let add_msg = res.message;
        // console.log("addClientData - fetch added new client");
        // console.log(add_msg);
        
        this.fetchAllClients();        
        this.accountService.fetchUnattachedAccounts(0);
    })
    .catch(err => {
        console.log("addClientData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  getClientByID(cid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.clients.length; idx++) {
      if (cid == this.clients[idx].rec_id) {
        to_update = this.clients[idx];
        return to_update;
      }
    }
    return null;
  }

  logoutClient() {
    // console.log("logoutClient - client was log out !");
    this.token="";  
  }

  loginClient(login_data) {                
    this.token="";
    // console.log("loginClient - fetch to login client");
    fetch(this.login_clients_url, {
      method: "POST",  
      body: JSON.stringify({              
              email: login_data.email,
              password: login_data.password }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                 
        // get token
        if (res.success) {
          // console.log("loginClient - got token");
          this.token = res.data[0];
          // console.log(res);

          if (this.token.length > 3)
            this.router.navigateByUrl('/clients-table'); // redirect to admin page
        } else {
            alert(res.message);
            // this.token="";
            this.router.navigateByUrl('/home'); // redirect to home page
        }
        // TODO:
        // save token (local/sssion storage)
        // send in call GET CLIENTS     
        // this.newMsgForClients("Login Token UPDATED"); // token updated
    })
    .catch(err => {
        console.log("loginClient - login client Error occured !");
        // this.token="";
        console.log(err);              
    })
  }           

}

  /*
      fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
      }).then(function(response) {
      response.status     //=> number 100–599
      response.statusText //=> String
      response.headers    //=> Headers
      response.url        //=> String

      return response.text()
      }, function(error) {
      error.message //=> String
      })

  */