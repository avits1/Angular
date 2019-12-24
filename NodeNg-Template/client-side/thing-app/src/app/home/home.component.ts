import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../services/things-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  thingsHomeArray:any = [];  
  constructor(private thingService: ThingsDataService) { }
    
  ngOnInit() {
    this.thingService.things_to_watch.subscribe( (home_msg) => { this.thingsHomeArray = home_msg } );            
    this.thingService.fetchListPartial();    
  }
  
}
