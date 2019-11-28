import { Component, OnInit } from '@angular/core';
import { ShareUserService } from '../share-user.service';

@Component({
  selector: 'app-table-sync',
  templateUrl: './table-sync.component.html',
  styleUrls: ['./table-sync.component.css']
})
export class TableSyncComponent implements OnInit {

  usersLocal:any = [];

  constructor(private userService: ShareUserService) { }

  ngOnInit() {
    this.usersLocal = this.userService.getAllUsers();
  }

  // editUser(id) {
  //   console.log("edit with id: " + id);       
  // }

  delUser(id) {  
    this.userService.delUserData(id);   
  }
}
