import { Component, OnInit } from '@angular/core';
import { ClientsDataService } from '../clients-data.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {

  clientsArray:any = [];
  clientserv_msg = "";
  constructor(private clientService: ClientsDataService) { }

  ngOnInit() {
    // this.clientService.currClientMsg.subscribe(client_msg => this.clientserv_msg = client_msg);
    this.clientService.currClientMsg.subscribe((client_msg) => 
    {
      this.clientserv_msg = client_msg;
      this.refreshTable();
    });    
    this.clientService.fetchAllClients();
  }

  refreshTable() {   
    this.clientsArray = this.clientService.getAllClients();    
  }

  delClient(rec_id) {  
    this.clientService.delClientData(rec_id);     
  }

}
