import { Component, OnInit } from '@angular/core';
import { OthersDataService } from '../services/others-data.service';

@Component({
  selector: 'app-others-comp',
  templateUrl: './others-comp.component.html',
  styleUrls: ['./others-comp.component.css']
})
export class OthersCompComponent implements OnInit {
  
  othersArray:any = [];

  constructor(private othersService: OthersDataService) { }

  ngOnInit() {
    this.othersService.others_to_watch.subscribe( (other_msg) => { this.othersArray = other_msg } );            
    this.othersService.fetchAllOthers();
  }
  
  delOther(id) {  
    this.othersService.delOtherData(id);     
  }

}
