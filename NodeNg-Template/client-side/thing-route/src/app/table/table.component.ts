import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() thingsArray:any;
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {   
  }

  // editThing(id) {
  //   console.log("edit with id: " + id);       
  // }

  delThing(id) {      
    this.messageEvent.emit(id); 
  }
}
