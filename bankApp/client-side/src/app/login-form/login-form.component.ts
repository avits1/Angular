import { Component, OnInit } from '@angular/core';
import { ClientsDataService } from '../clients-data.service';
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
  login_client = {};
 
// private route: ActivatedRoute, private router: Router
  constructor(private clientService: ClientsDataService) { }

  ngOnInit() {
  }

  logoutClient() {  
    this.clientService.logoutClient();
    alert("LOGGING OUT!");
  }

  loginClient() {           
    if ( this.email == "" || this.password == "" ) {        
      console.log("loginClient - missing values. can't save .. ");
      alert("loginClient - missing values. can't save .. ");
      this.clearForm();
      return;
    }
    this.login_client = {      
    //   client_id: this.client_id, // ID = TZ
    //   phone: this.phone,
      email: this.email,
      password: this.password
    };        
    console.log("loginClient - call  clientService.loginClient()");
    console.log(this.login_client); // TEST
    this.clientService.loginClient(this.login_client);
    // alert("LOGIN CLIENT, EMAIL:" + this.email);
    this.clearForm();
    this.login_client={};    
    // this.router.navigateByUrl('/clients-table'); // redirect back to clients table
  }  

  clearForm() {   
    this.email = "";
    this.password = "";        
  }  

}
