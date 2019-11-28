import { Component, OnInit } from '@angular/core';
// import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';
// import { Component, OnInit} from '@angular/core';
import { ShareUserService } from '../share-user.service';

@Component({
  selector: 'app-table-async',
  templateUrl: './table-async.component.html',
  styleUrls: ['./table-async.component.css']
})
export class TableAsyncComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  // @Input() usersArray:any;
  // @Output() messageEvent = new EventEmitter<string>();
  usersLocal:any = [];

  constructor(private userService: ShareUserService) { }

  ngOnInit() {
    this.usersLocal = this.userService.getAllUsers();
  }

  editUser(id) {
    console.log("edit with id: " + id);       
  }

  delUser(id) {  
    this.userService.delUserData(id);   
    // this.messageEvent.emit(id); 
  }  
  
}
