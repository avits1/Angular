import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OthersDataService {

  // 1. Shorter Imp of Observable:  
  private others_obs = new BehaviorSubject([]);
  public  others_to_watch = this.others_obs.asObservable();
  
  // 2. other ways:
  // From: https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

  // Observeble Service Message:
  // private msgOthersSource = new BehaviorSubject('DEFAULT'); // default message
  // currOtherMsg = this.msgOthersSource.asObservable();

  // changeOtherMessage(other_msg: string) {
  //   this.msgOthersSource.next(other_msg)
  // }

  // newMsgForOthers(msg) {    
  //   this.changeOtherMessage(msg);    
  // }
  ////////////////////////////

  unattached_others_url = "http://localhost:3000/others/unattached"; // GET  
  others_url = "http://localhost:3000/others/"; // GET + POST + PUT + DELETE

  others = [];
  // unattached_others = [];

  constructor() { }
    
  fetchUnattachedOthers(my_other){
    let temp_url = this.unattached_others_url + "/?other_id=" + my_other;
    fetch(temp_url, {    
      method: "GET",      
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {    
        // this.unattached_others = res.data;        
        this.others_obs.next(res.data); // = this.unattached_others
    })
    .catch(err => {
        console.log("fetchUnattachedOthers - fetch Error occured !");
        console.log(err);              
    })
  }


  delOtherData(aid) {        
    fetch(this.others_url, {
        method: "DELETE",
        body: JSON.stringify({other_id: aid}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {              
          this.fetchAllOthers();          
          this.fetchUnattachedOthers(0); // for updating select/DDL
      })
      .catch(err => {
          console.log("delOtherData - fetch delete Error occured !");
          console.log(err);              
      })
  }

      
  fetchAllOthers(){
    fetch(this.others_url)
        .then((res) => { return res.json(); })
        .then((res) => {    
            this.others = res.data;            
            this.others_obs.next(res.data); // = this.others
        })
        .catch(err => {
            console.log("fetchAllOthers - fetch Error occured !");
            console.log(err);              
        })
  }

  getOtherByID(aid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.others.length; idx++) {
      if (aid == this.others[idx].id) {
        to_update = this.others[idx];
        return to_update;
      }
    }
    return null;
  }
  
  addOtherData(new_other) {                    
    fetch(this.others_url, {
      method: "POST",  
      body: JSON.stringify({
          id: 0, // Auto INC by DB !
          bank: new_other.bank,      
          branch: new_other.branch,
          acc_num: new_other.acc_num,
          amount: new_other.amount,
          credit: new_other.credit }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {            
        this.fetchAllOthers();        
        this.fetchUnattachedOthers(0); // for updating select/DDL
    })
    .catch(err => {
        console.log("addOtherData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  
  updateOtherData(other_data) {    
    
    fetch(this.others_url, {
      method: "PUT",  
      body: JSON.stringify({
        id: other_data.id, 
        bank: other_data.bank,      
        branch: other_data.branch,
        acc_num: other_data.acc_num,
        amount: other_data.amount,
        credit: other_data.credit }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                    
        this.fetchAllOthers();        
        this.fetchUnattachedOthers(0); // for updating select/DDL
    })
    .catch(err => {
        console.log("updateOtherData - fetch update Error occured !");
        console.log(err);              
    })
  }

}
