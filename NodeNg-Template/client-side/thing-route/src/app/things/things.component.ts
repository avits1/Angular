import { Component, OnInit } from '@angular/core';
// import { AddFormComponent } from '../add-form/add-form.component';
// import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})

export class ThingsComponent implements OnInit {

  things1 = [{id:1, name:"avraham",age:"40",phone:"05468977",gender: 1,smoking:false},
            {id:2, name:"moshe",age:"30",phone:"053311226",gender: 1,smoking:true},
            {id:3, name:"yaakov",age:"50",phone:"059966773",gender: 1,smoking:false},
            {id:4, name:"lea",age:"49",phone:"059988776",gender: 2,smoking:false}]  

  constructor() { }
  
  ngOnInit() {
  }
  
  addThing($event) {
    this.things1.push(JSON.parse($event));        
  }            
  
  deleteThing($event) {    
    let uid:number = $event;   

    for (let idx = 0 ; idx < this.things1.length ;idx++) {
      if (uid == this.things1[idx].id) {
          this.things1.splice(idx,1);           
          break;
      }
     }   
  }         

}
