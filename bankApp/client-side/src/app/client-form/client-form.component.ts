import { Component, OnInit } from '@angular/core';
import { ClientsDataService } from '../clients-data.service';
import { AccountsDataService } from '../accounts-data.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  client_name = "";
  client_id = "";
  phone = "";
  email = "";
  password = "";
  account_id = 0;
  rec_id = 0;

  updated_id = "";
  new_client = {};
  accounts_select = [];

  // clientserv_msg = "";
  acountserv_msg = "";  

  constructor(private clientService: ClientsDataService, private accountService: AccountsDataService,
                   private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.clientService.currClientMsg.subscribe(client_msg => this.clientserv_msg = client_msg); 

    this.accountService.currAccountMsg.subscribe((account_msg) => 
    {
      this.acountserv_msg = account_msg;
      this.refreshSelect();
    });     

    this.updated_id = this.route.snapshot.paramMap.get('rec_id');         
    if (this.updated_id != null) {
      this.rec_id = parseInt(this.updated_id); // also: Number()   
    }        
    if (this.rec_id > 0) {
      let to_update = this.clientService.getClientByID(this.rec_id);
      if (to_update == null) {
        console.log("get client details by its ID - Failed !");
        return;
      }  
      // console.log("got object client named:" + to_update.client_name
      //          + " linked to account id: " +  to_update.account_id);      

      // Fill The Form 
      this.client_name = to_update.client_name;
      this.client_id = to_update.client_id;  // ID = TZ
      this.phone = to_update.phone;
      this.email = to_update.email;
      this.password = to_update.password;
      this.account_id = to_update.account_id;           
    }       

    if (this.accounts_select.length == 0 || this.account_id > 0)
      this.accountService.fetchUnattachedAccounts(this.account_id);
  }

  updateClient() {
    if (this.rec_id < 1) {
      console.log("updateClient - Can't update client id 0");
      alert("updateClient - Can't update client id 0");
      this.clearForm();
      return;
    }   
    let client_data = {
        recID: this.rec_id, 
        client_name: this.client_name,
        client_id: this.client_id,  // ID = TZ
        phone: this.phone,
        email: this.email,
        password: this.password,
        account_id: this.account_id
    };        
    this.clientService.updateClientData(client_data);    
    this.clearForm();   
    this.router.navigateByUrl('/clients-table'); // redirect back to clients table
  }

  saveClient() {           
    if (this.client_name == "" || this.client_id == "" || this.phone == "" || this.email == "" || this.password == "") {
      console.log("saveClient - missing values. can't save .. ");
      alert("saveClient - missing values. can't save .. ");
      return;
    }
    this.new_client = {
      rec_id: 0, // Auto INC by DB !
      client_name: this.client_name,      
      client_id: this.client_id, // ID = TZ
      phone: this.phone,
      email: this.email,
      password: this.password,
      account_id: this.account_id
    }    
    console.log(this.new_client); // TEST
    this.clientService.addClientData(this.new_client);
    this.clearForm();
    this.new_client={};    
    this.router.navigateByUrl('/clients-table'); // redirect back to clients table
  }  

  refreshSelect() {
    // console.log("refreshSelect done by getUnattachedAccounts()");
    this.accounts_select = this.accountService.getUnattachedAccounts();    
  }

  clearForm() {
    this.client_name = "";
    this.client_id = "";    
    this.phone = "";
    this.email = "";
    this.password = "";    
    this.account_id = 0;   
    this.rec_id = 0;
  }

}
