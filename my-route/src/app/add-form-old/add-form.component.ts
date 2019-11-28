import { Component, OnInit } from '@angular/core';
// import { Component, OnInit , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  
  name="";
  age=0;  
  phone="";
  gender=1; // Male = 1 / Female = 2
  smoking=false;
  new_user={};
  new_user_json="";

  // @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  
  // saveUser() {   
  //   console.log( this.name,this.age,this.phone , this.gender, this.smoking);
  //   this.new_user = {
  //     name: this.name,
  //     age: this.age,
  //     phone: this.phone,
  //     gender: this.gender,
  //     smoking: this.smoking
  //   };    
  //   this.new_user_json = JSON.stringify(this.new_user);    
  //   this.messageEvent.emit(this.new_user_json); 
  //   this.name = "";
  //   this.age = 0;
  //   this.phone = "";
  //   this.gender = 0;
  //   this.smoking = false;
  //   this.new_user={};
  // }

}
