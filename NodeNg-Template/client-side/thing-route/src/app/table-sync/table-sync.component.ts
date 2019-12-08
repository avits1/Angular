import { Component, OnInit } from '@angular/core';
import { ShareThingService } from '../share-thing.service';

@Component({
  selector: 'app-table-sync',
  templateUrl: './table-sync.component.html',
  styleUrls: ['./table-sync.component.css']
})
export class TableSyncComponent implements OnInit {

  thingsLocal:any = [];

  constructor(private thingService: ShareThingService) { }

  ngOnInit() {
    this.thingsLocal = this.thingService.getAllThings();
  }

  // editThing(id) {
  //   console.log("edit with id: " + id);       
  // }

  delThing(id) {  
    this.thingService.delThingData(id);   
  }
}
