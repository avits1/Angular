import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../services/things-data.service';

@Component({
  selector: 'app-things-table',
  templateUrl: './things-table.component.html',
  styleUrls: ['./things-table.component.css']
})
export class ThingsTableComponent implements OnInit {

  thingsArray:any = []; 
  constructor(private thingService: ThingsDataService) { }

  ngOnInit() {    
    this.thingService.things_to_watch.subscribe( (thing_msg) => { this.thingsArray = thing_msg } );    
    this.thingService.fetchAllThings();   
  }

  delThing(rec_id) {  
    this.thingService.delThingData(rec_id);     
  }

}
