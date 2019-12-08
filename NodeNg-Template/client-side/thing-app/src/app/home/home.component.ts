import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../things-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  thingsHomeArray:any = [];
  thinghome_serv_msg = "";
  constructor(private thingService: ThingsDataService) { }
  
  
  // constructor() { }

  ngOnInit() {
 // this.thingService.currThingMsg.subscribe(thing_msg => this.thingserv_msg = thing_msg);
    this.thingService.currThingMsg.subscribe((thing_msg) => 
    {
      this.thinghome_serv_msg = thing_msg;
      if (this.thinghome_serv_msg.includes("HOME"))
          this.refreshTable();
    });    
    this.thingService.fetchListPartial();    
  }
  
  refreshTable() {   
    this.thingsHomeArray = this.thingService.getListPartial();    
  }

}
