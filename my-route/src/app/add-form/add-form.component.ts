// import { Component, OnInit } from '@angular/core';
import { Component, OnInit , Output, EventEmitter} from '@angular/core';
// import { ShareUserService } from '../share-user.service';
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
  new_user={};
  new_user_json="";

  @Output() messageEvent = new EventEmitter<string>();
  // @Output() updateEvent = new EventEmitter<string>();

  constructor(){}
  // constructor(private userService: ShareUserService,
  //               private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.updated_id = this.route.snapshot.paramMap.get('id');         
    // if (this.updated_id != null) {
    //   this.id = parseInt(this.updated_id); // also: Number()   
    // }        
    // if (this.id > 0) {
    //   let to_update = this.userService.getUserByID(this.id);
    //   // console.log("got object user named:" + to_update.name);
    //   if (to_update == null) {
    //     console.log("get user details by its ID - Failed !");
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

  // updateUser() {
  //   if (this.id < 1) {
  //     console.log("updateUser - Can't update user id 0");
  //     alert("updateUser - Can't update user id 0");
  //     this.clearForm();
  //     return;
  //   }   
  //   let user_data = {
  //       id: this.id,
  //       name: this.name,
  //       age: this.age,
  //       phone: this.phone,
  //       gender: this.gender,
  //       smoking: this.smoking
  //   };    
  //   console.log("updateUser - updating user " + user_data.name + " with smoking: " + user_data.smoking);
  //   this.clearForm();   
  //   //  // this.updateEvent.emit(user_data as json ..); 
  // }

  // Add User !
  saveUser() {   
    // console.log( this.id,this.name,this.age,this.phone , this.gender, this.smoking);
    if (this.name == "" || this.age == 0 || this.phone == "") {
      console.log("saveUser - missing values. can't save .. ");
      alert("saveUser - missing values. can't save .. ");
      return;
    }
    this.new_user = {
      id: this.curr_id++,
      name: this.name,      
      age: this.age,
      phone: this.phone,
      gender: this.gender,
      smoking: this.smoking
    };    
    this.new_user_json = JSON.stringify(this.new_user);    
    this.messageEvent.emit(this.new_user_json); 
    // this.userService.addUserData(this.new_user);
    this.clearForm();
    this.new_user={};    
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
