import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [{name:"avraham",age:"40",phone:"05468977",gender: 1,smoking:false},
            {name:"moshe",age:"30",phone:"053311226",gender: 1,smoking:true},
            {name:"yaakov",age:"50",phone:"059966773",gender: 1,smoking:false},
            {name:"lea",age:"49",phone:"059988776",gender: 2,smoking:false}]  
  
  constructor() { }

  ngOnInit() {
  }
  
  receiveMessage($event) {
    let temp_obj = null;//  = "";
    this.users.push(JSON.parse($event));    
    // temp_obj = JSON.parse($event);
    // console.log("new user pushed - smoking:" +temp_obj.smoking);
  }            
}
