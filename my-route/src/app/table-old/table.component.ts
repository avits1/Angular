import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() usersArray:any;
  constructor() { }

  ngOnInit() {
  }

  editUser(id) {
    console.log("edit with id: " + id);
  }

  delUser(id) {
    console.log("delete with id: " + id);
  }

}
