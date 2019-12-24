import { Component, OnInit } from '@angular/core';
import { ThingsDataService } from '../services/things-data.service';
import { OthersDataService } from '../services/others-data.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thing-form',
  templateUrl: './thing-form.component.html',
  styleUrls: ['./thing-form.component.css']
})
export class ThingFormComponent implements OnInit {

  thing_name = "";
  thing_id = "";
  phone = "";
  email = "";
  password = "";
  other_id = 0;
  rec_id = 0;
// date_create;

  updated_id = "";
  new_thing = {};
  others_select = [];
  
  constructor(private thingService: ThingsDataService, private otherService: OthersDataService,
                   private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /// Shorter Imp for Observable use - with direct assignment:
    // this.thingService.things_to_watch.subscribe( (thing_msg) => { this.things_select = thing_msg } );   
    this.otherService.others_to_watch.subscribe( (other_msg) => { this.others_select = other_msg } );       
    this.refreshSelect();
       
    this.updated_id = this.route.snapshot.paramMap.get('rec_id');         
    if (this.updated_id != null) {
      this.rec_id = parseInt(this.updated_id); // also: Number()   
    }        
    if (this.rec_id > 0) {
      let to_update = this.thingService.getThingByID(this.rec_id);
      if (to_update == null) {
        console.log("get thing details by its ID - Failed !");
        return;
      }  
     
      // Fill The Form 
      this.thing_name = to_update.thing_name;
      this.thing_id = to_update.thing_id; 
      this.phone = to_update.phone;
      this.email = to_update.email;
      this.password = to_update.password;
      this.other_id = to_update.other_id;           
    }       

    if (this.others_select.length == 0 || this.other_id > 0)
      this.otherService.fetchUnattachedOthers(this.other_id);
  }

  updateThing() {
    if (this.rec_id < 1) {
      console.log("updateThing - Can't update thing id 0");
      alert("updateThing - Can't update thing id 0");
      this.clearForm();
      return;
    }   
    let thing_data = {
        recID: this.rec_id, 
        thing_name: this.thing_name,
        thing_id: this.thing_id, 
        phone: this.phone,
        email: this.email,
        password: this.password,
        other_id: this.other_id
    };        
    this.thingService.updateThingData(thing_data);    
    this.clearForm();   
    this.router.navigateByUrl('/route-to-things'); // route name from app-routing.module    
  }

  saveThing() {           
    if (this.thing_name == "" || this.thing_id == "" || this.phone == "" || this.email == "" || this.password == "") {
      console.log("saveThing - missing values. can't save .. ");
      alert("saveThing - missing values. can't save .. ");
      return;
    }
    // var created_date = new Date();
    this.new_thing = {
      rec_id: 0, // Auto INC by DB !
      thing_name: this.thing_name,      
      thing_id: this.thing_id,
      phone: this.phone,
      email: this.email,
      password: this.password,
      other_id: this.other_id
      // date_create: new Date()
    }        
    this.thingService.addThingData(this.new_thing);
    this.clearForm();
    this.new_thing={};    
    this.router.navigateByUrl('/route-to-things'); // route name from app-routing.module    
  }  

  refreshSelect() {        
    this.otherService.fetchUnattachedOthers(0);        
  }

  clearForm() {
    this.thing_name = "";
    this.thing_id = "";    
    this.phone = "";
    this.email = "";
    this.password = "";    
    this.other_id = 0;   
    this.rec_id = 0;
  }

}
