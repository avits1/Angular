// import { Component, OnInit } from '@angular/core';
import { Component, OnInit , Output, EventEmitter} from '@angular/core';
// import { ShareThingService } from '../share-thing.service';
// import { ActivatedRoute } from '@angular/router';
// import {Router} from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})

// var curr_id=0;
export class AddFormComponent implements OnInit {

  curr_id=5;
  // updated_id = "";
  id=0;
  name="";
  age=0;  
  phone="";
  gender=1; // Male = 1 / Female = 2
  smoking=false;
  new_thing={};
  new_thing_json="";

  @Output() messageEvent = new EventEmitter<string>();
  // @Output() updateEvent = new EventEmitter<string>();

  constructor(){}
  // constructor(private thingService: ShareThingService,
  //               private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.updated_id = this.route.snapshot.paramMap.get('id');         
    // if (this.updated_id != null) {
    //   this.id = parseInt(this.updated_id); // also: Number()   
    // }        
    // if (this.id > 0) {
    //   let to_update = this.thingService.getThingByID(this.id);
    //   // console.log("got object thing named:" + to_update.name);
    //   if (to_update == null) {
    //     console.log("get thing details by its ID - Failed !");
    //     return;
    //   }  
      // Fill The Form 
      // this.name = to_update.name;
      // this.age = to_update.age;
      // this.phone = to_update.phone;
      // this.gender = to_update.gender;
      // this.smoking = to_update.smoking;   
    // }       
  }

  // updateThing() {
  //   if (this.id < 1) {
  //     console.log("updateThing - Can't update thing id 0");
  //     alert("updateThing - Can't update thing id 0");
  //     this.clearForm();
  //     return;
  //   }   
  //   let thing_data = {
  //       id: this.id,
  //       name: this.name,
  //       age: this.age,
  //       phone: this.phone,
  //       gender: this.gender,
  //       smoking: this.smoking
  //   };    
  //   console.log("updateThing - updating thing " + thing_data.name + " with smoking: " + thing_data.smoking);
  //   this.clearForm();   
  //   //  // this.updateEvent.emit(thing_data as json ..); 
  // }

  // Add Thing !
  saveThing() {   
    // console.log( this.id,this.name,this.age,this.phone , this.gender, this.smoking);
    if (this.name == "" || this.age == 0 || this.phone == "") {
      console.log("saveThing - missing values. can't save .. ");
      alert("saveThing - missing values. can't save .. ");
      return;
    }
    this.new_thing = {
      id: this.curr_id++,
      name: this.name,      
      age: this.age,
      phone: this.phone,
      gender: this.gender,
      smoking: this.smoking
    };    
    this.new_thing_json = JSON.stringify(this.new_thing);    
    this.messageEvent.emit(this.new_thing_json); 
    // this.thingService.addThingData(this.new_thing);
    this.clearForm();
    this.new_thing={};    
    // this.router.navigateByUrl('/table'); // redirect back to table
  }  

  clearForm() {
    this.id = 0;
    this.name = "";
    this.age = 0;
    this.phone = "";
    this.gender = 0;
    this.smoking = false;   
  }
}
