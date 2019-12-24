import { Injectable } from '@angular/core';
import { OthersDataService } from './others-data.service';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
// import { Routes, RouterModule } from '@angular/router';

// From: https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

// export class DataService {

//   more Heavy Observable Imp:
//   private msgMovieSource = new BehaviorSubject('no movies'); // default message
//   currMovieMsg = this.msgMovieSource.asObservable();

//   constructor() { }

//   changeMovieMessage(message: string) {
//     this.msgMovieSource.next(message)
//   }
// }

/// IMPORTANT: this service module includes working with JWT - partially for LOGIN

@Injectable({
  providedIn: 'root'
})
export class ThingsDataService {

  // 1. Shorter Imp of Observable:  
  private things_obs = new BehaviorSubject([]);
  public things_to_watch = this.things_obs.asObservable();

  // 2. Alternative - Observeble Service Message: //////////////
  // private msgThingSource = new BehaviorSubject('DEFAULT'); // default message
  // currThingMsg = this.msgThingSource.asObservable();

  // changeThingMessage(thing_msg: string) {
  //   this.msgThingSource.next(thing_msg)
  // }

  // newMsgForThings(msg) {    
  //   this.changeThingMessage(msg);    
  // }
  //////////////////////////////////////////////////////////

  things = [];
  things_home = [];
  token = "";
  
  admin_things_url = "http://localhost:3000/things/admin"; // GET (Admin Only)
  things_url = "http://localhost:3000/things/insert"; // POST + PUT + DELETE  
  login_things_url = "http://localhost:3000/things/login"; // LOGIN BY POST
  home_things_url = "http://localhost:3000/things/home"; // LIST /Partial (Home page)

  constructor(private otherService: OthersDataService, private router: Router) { }
  
  updateThingData(thing_data) {        
    fetch(this.things_url, {
      method: "PUT",  
      body: JSON.stringify({
              recID: thing_data.recID,
              thing_name: thing_data.thing_name,      
              thing_id: thing_data.thing_id,
              phone: thing_data.phone,
              email: thing_data.email,
              password: thing_data.password,
              other_id: thing_data.other_id }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                   
        this.fetchAllThings();        
        this.otherService.fetchUnattachedOthers(0); // update select/DDL
    })
    .catch(err => {
        console.log("updateThingData - fetch update Error occured !");
        console.log(err);              
    })
  }
  
  delThingData(cid) {        
    fetch(this.things_url, {
        method: "DELETE",        
        body: JSON.stringify({recID: cid}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {             
          this.fetchAllThings();          
          this.otherService.fetchUnattachedOthers(0); // update select/DDL
      })
      .catch(err => {
          console.log("delThingData - fetch delete Error occured !");
          console.log(err);              
      })
  }

      
  fetchListPartial(){
    fetch(this.home_things_url)
        .then((res) => { return res.json(); })
        .then((res) => {    
            // this.things_home = res.data;                                  
            this.things_obs.next(res.data); // = this.things_home
        })
        .catch(err => {
            console.log("fetchListPartial - fetch Error occured !");
            console.log(err);              
        })
  } 

      
  fetchAllThings(){    
    let admin_url = this.admin_things_url + "/?token=" + this.token;
    fetch(admin_url)
        .then((res) => { return res.json(); })
        .then((res) => {                
            // this.things = res.data;                     
            // if (this.things.length > 0)              
            if (res.data.length > 0)
                this.things_obs.next(res.data); // = things
            else {
              // navigate to login
              alert("UNKNOWN USER ! redirect to login");
              this.router.navigateByUrl('/login-form');
            }  
        })
        .catch(err => {
            console.log("fetchAllThings - fetch Error occured !");
            console.log(err);              
        })
  } 
  
  addThingData(new_thing) {                    
    fetch(this.things_url, {
      method: "POST",  
      body: JSON.stringify({
              id: 0, // Auto INC by DB !
              thing_name: new_thing.thing_name,      
              thing_id: new_thing.thing_id,
              phone: new_thing.phone,
              email: new_thing.email,
              password: new_thing.password,
              other_id: new_thing.other_id }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                    
        this.fetchAllThings();        
        this.otherService.fetchUnattachedOthers(0); // update select/DDL
    })
    .catch(err => {
        console.log("addThingData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  getThingByID(cid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.things.length; idx++) {
      if (cid == this.things[idx].rec_id) {
        to_update = this.things[idx];
        return to_update;
      }
    }
    return null;
  }

  logoutThing() {    
    this.token="";  
  }

  loginThing(login_data) {                
    this.token="";    
    fetch(this.login_things_url, {
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
          this.token = res.data[0];
          // console.log(res);

          if (this.token.length > 3) // redirect to things table/cubes:
            this.router.navigateByUrl('/route-to-things'); // redirect - route name from app-routing.module    
        } else {
            alert(res.message);
            // this.token="";
            this.router.navigateByUrl('/home'); // redirect to home page
        }
        // TODO:
        // save token (local/sssion storage)
        // send in call GET CLIENTS:
        // this.token_obs.next(token); // token updated        
    })
    .catch(err => {
        console.log("loginThing - login thing Error occured !");
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