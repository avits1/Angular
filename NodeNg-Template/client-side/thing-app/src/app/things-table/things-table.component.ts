import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../things-data.service';

@Component({
  selector: 'app-things-table',
  templateUrl: './things-table.component.html',
  styleUrls: ['./things-table.component.css']
})
export class ThingsTableComponent implements OnInit {

  thingsArray:any = [];
  thingserv_msg = "";
  constructor(private thingService: ThingsDataService) { }

  ngOnInit() {
    // this.thingService.currThingMsg.subscribe(thing_msg => this.thingserv_msg = thing_msg);
    this.thingService.currThingMsg.subscribe((thing_msg) => 
    {
      this.thingserv_msg = thing_msg;
      this.refreshTable();
    });    
    this.thingService.fetchAllThings();
  }

  refreshTable() {   
    this.thingsArray = this.thingService.getAllThings();    
  }

  delThing(rec_id) {  
    this.thingService.delThingData(rec_id);     
  }

}
