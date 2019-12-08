import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OthersDataService {

  // Observeble Service Message:
  private msgOthersSource = new BehaviorSubject('DEFAULT'); // default message
  currOtherMsg = this.msgOthersSource.asObservable();

  changeOtherMessage(other_msg: string) {
    this.msgOthersSource.next(other_msg)
  }

  newMsgForOthers(msg) {    
    this.changeOtherMessage(msg);    
  }

  unattached_others_url = "http://localhost:3000/others/unattached"; // GET
  get_others_url = "http://localhost:3000/others"; // GET
  delete_other_url = "http://localhost:3000/others/delete"; // DELETE
  insert_other_url = "http://localhost:3000/others/insert"; // PUT  
  update_other_url = "http://localhost:3000/others/update"; // POST

  others = [];
  unattached_others = [];

  constructor() { }

  getUnattachedOthers(){
    return this.unattached_others;
  }
  
  fetchUnattachedOthers(my_other){
    let temp_url = this.unattached_others_url + "/?other_id=" + my_other;
    fetch(temp_url, {
    // fetch(this.unattached_others_url, {      
      method: "GET",
      // body: JSON.stringify({other_id: my_other}),      
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {    
        this.unattached_others = res.data;
        // console.log("fetchUnattachedOthers - fetch retrived un attached others:");
        // console.log(this.unattached_others);
        this.newMsgForOthers("UNATTACHED ACC. UPDATED"); // un-attached others are updated
    })
    .catch(err => {
        console.log("fetchUnattachedOthers - fetch Error occured !");
        console.log(err);              
    })
  }


  delOtherData(aid) {        
    fetch(this.delete_other_url, {
        method: "DELETE",
        body: JSON.stringify({other_id: aid}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {    
          // let del_msg = res.data;
          // console.log("delOtherData - fetch deleted other with Id:" + aid);
          // console.log(del_msg);
          this.fetchAllOthers();          
          this.fetchUnattachedOthers(0);
      })
      .catch(err => {
          console.log("delOtherData - fetch delete Error occured !");
          console.log(err);              
      })
  }

  getAllOthers(){    
    return this.others;
  }
    
  fetchAllOthers(){
    fetch(this.get_others_url)
        .then((res) => { return res.json(); })
        .then((res) => {    
            this.others = res.data;
            // console.log("fetchAllOthers - fetch retrived all others:");
            // console.log(this.others);
            this.newMsgForOthers("OTHERS-TABLE UPDATED"); // others are updated            
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
    // console.log("addOtherData - started for other: " + new_other.bank
    //        + " | " + new_other.branch + " | " +  new_other.acc_num);
    fetch(this.insert_other_url, {
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
        // let add_msg = res.message;
        // console.log("addOtherData - fetch added new other");
        // console.log(add_msg);
        this.fetchAllOthers();        
        this.fetchUnattachedOthers(0);
    })
    .catch(err => {
        console.log("addOtherData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  
  updateOtherData(other_data) {    
    
    fetch(this.update_other_url, {
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
        // let update_msg = res.message;        
        // console.log(update_msg);
        this.fetchAllOthers();        
        this.fetchUnattachedOthers(0);
    })
    .catch(err => {
        console.log("updateOtherData - fetch update Error occured !");
        console.log(err);              
    })
  }

}
