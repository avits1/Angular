import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../services/things-data.service';
// import { ActivatedRoute } from '@angular/router';
// import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email = "";
  password = "";
  login_thing = {};
 
// private route: ActivatedRoute, private router: Router
  constructor(private thingService: ThingsDataService) { }

  ngOnInit() {
  }

  logoutThing() {  
    this.thingService.logoutThing();
    alert("LOGGING OUT!");
  }

  loginThing() {           
    if ( this.email == "" || this.password == "" ) {        
      console.log("loginThing - missing values. can't save .. ");
      alert("loginThing - missing values. can't save .. ");
      this.clearForm();
      return;
    }
    this.login_thing = {      
    //   thing_id: this.thing_id, // ID = TZ
    //   phone: this.phone,
      email: this.email,
      password: this.password
    };                
    this.thingService.loginThing(this.login_thing);    
    this.clearForm();
    this.login_thing={};    
    // this.router.navigateByUrl('/things-table'); // redirect back to things table
  }  

  clearForm() {   
    this.email = "";
    this.password = "";        
  }  

}
