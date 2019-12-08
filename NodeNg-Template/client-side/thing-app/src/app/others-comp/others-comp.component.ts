import { Component, OnInit } from '@angular/core';
import { OthersDataService } from '../others-data.service';

@Component({
  selector: 'app-others-comp',
  templateUrl: './others-comp.component.html',
  styleUrls: ['./others-comp.component.css']
})
export class OthersCompComponent implements OnInit {

  otherserv_msg = "";
  othersArray:any = [];

  constructor(private othersService: OthersDataService) { }

  ngOnInit() {
    this.othersService.currOtherMsg.subscribe((other_msg) => 
    {
      this.otherserv_msg = other_msg;
      this.refreshOthers();
    });    
    this.othersService.fetchAllOthers();
  }

  refreshOthers() {   
    this.othersArray = this.othersService.getAllOthers();    
  }

  delOther(id) {  
    this.othersService.delOtherData(id);     
  }

}
