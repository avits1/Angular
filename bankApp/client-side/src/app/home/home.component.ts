import { Component, OnInit } from '@angular/core';
import { ClientsDataService } from '../clients-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientsHomeArray:any = [];
  clienthome_serv_msg = "";
  constructor(private clientService: ClientsDataService) { }
  
  
  // constructor() { }

  ngOnInit() {
 // this.clientService.currClientMsg.subscribe(client_msg => this.clientserv_msg = client_msg);
    this.clientService.currClientMsg.subscribe((client_msg) => 
    {
      this.clienthome_serv_msg = client_msg;
      if (this.clienthome_serv_msg.includes("HOME"))
          this.refreshTable();
    });    
    this.clientService.fetchListPartial();    
  }
  
  refreshTable() {   
    this.clientsHomeArray = this.clientService.getListPartial();    
  }

}
