import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() usersArray:any;
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {   
  }

  // editUser(id) {
  //   console.log("edit with id: " + id);       
  // }

  delUser(id) {      
    this.messageEvent.emit(id); 
  }
}
