import { Component, OnInit } from '@angular/core';
import { ShareThingService } from '../share-thing.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-form-sync',
  templateUrl: './add-form-sync.component.html',
  styleUrls: ['./add-form-sync.component.css']
})

// var curr_id=0;
export class AddFormSyncComponent implements OnInit {
  
  curr_id=5;
  updated_id = "";
  id=0;
  name="";
  age=0;  
  phone="";
  gender=1; // Male = 1 / Female = 2
  smoking=false;
  new_thing={};

  constructor(private thingService: ShareThingService,
    private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.updated_id = this.route.snapshot.paramMap.get('id');         
    if (this.updated_id != null) {
      this.id = parseInt(this.updated_id); // also: Number()   
    }        
    if (this.id > 0) {
      let to_update = this.thingService.getThingByID(this.id);
      // console.log("got object user named:" + to_update.name);
      if (to_update == null) {
        console.log("get thing details by its ID - Failed !");
        return;
      }  
      // Fill The Form 
      this.name = to_update.name;
      this.age = to_update.age;
      this.phone = to_update.phone;
      this.gender = to_update.gender;
      this.smoking = to_update.smoking;   
    }       
  }

  updateThing() {
    if (this.id < 1) {
      console.log("updateThing - Can't update thing id 0");
      alert("updateThing - Can't update thing id 0");
      this.clearForm();
      return;
    }   
    let thing_data = {
        id: this.id,
        name: this.name,
        age: this.age,
        phone: this.phone,
        gender: this.gender,
        smoking: this.smoking
    };    
    this.thingService.updateThingData(thing_data);
    console.log("updateThing - updating thing " + thing_data.name + " with smoking: " + thing_data.smoking);
    this.clearForm();   
    this.router.navigateByUrl('/table-sync'); // redirect back to table
  }

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
    this.thingService.addThingData(this.new_thing);
    this.clearForm();
    this.new_thing={};    
    this.router.navigateByUrl('/table-sync'); // redirect back to table
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
