import { Component, OnInit } from '@angular/core';
import { AccountsDataService } from '../accounts-data.service';

@Component({
  selector: 'app-accounts-comp',
  templateUrl: './accounts-comp.component.html',
  styleUrls: ['./accounts-comp.component.css']
})
export class AccountsCompComponent implements OnInit {

  accountserv_msg = "";
  accountsArray:any = [];

  constructor(private accountsService: AccountsDataService) { }

  ngOnInit() {
    this.accountsService.currAccountMsg.subscribe((account_msg) => 
    {
      this.accountserv_msg = account_msg;
      this.refreshAccounts();
    });    
    this.accountsService.fetchAllAccounts();
  }

  refreshAccounts() {   
    this.accountsArray = this.accountsService.getAllAccounts();    
  }

  delAccount(id) {  
    this.accountsService.delAccountData(id);     
  }

}
