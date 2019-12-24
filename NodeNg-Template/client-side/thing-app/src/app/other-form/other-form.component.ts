import { Component, OnInit } from '@angular/core';
import { OthersDataService } from '../services/others-data.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-other-form',
  templateUrl: './other-form.component.html',
  styleUrls: ['./other-form.component.css']
})
export class OtherFormComponent implements OnInit {
  
  bank = null;
  branch = null;
  acc_num = "";
  amount = 0;
  credit = 0;  
  rec_id = 0;
  // date_create;

  updated_id = "";
  new_other = {};

  constructor(private othersService: OthersDataService,
                   private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
        
    this.updated_id = this.route.snapshot.paramMap.get('id');         
    if (this.updated_id != null) {
      this.rec_id = parseInt(this.updated_id); // also: Number()   
    }        
    if (this.rec_id > 0) {
      let to_update = this.othersService.getOtherByID(this.rec_id);      
      if (to_update == null) {
        console.log("get other details by its ID - Failed !");
        return;
      }  
      // Fill The Form 
      this.bank = to_update.bank;
      this.branch = to_update.branch;
      this.acc_num = to_update.acc_num;
      this.amount = to_update.amount;
      this.credit = to_update.credit;      
      this.rec_id = to_update.id;           
    }       
  }
  
  updateOther() {
    if (this.rec_id < 1) {
      console.log("updateOther - Can't update other id 0");
      alert("updateOther - Can't update other id 0");
      this.clearForm();
      return;
    }   
    let other_data = {
        id: this.rec_id,
        bank: this.bank,
        branch: this.branch,
        acc_num: this.acc_num,
        amount: this.amount,
        credit: this.credit
    };    
    this.othersService.updateOtherData(other_data);
    this.clearForm();   
    // redirect back to others list/cubes - like '/others-comp'
    this.router.navigateByUrl('/route-to-others'); // route name from app-routing.module    
  }

  // Add Other !
  saveOther() {     
    if (this.bank == 0 || this.branch == 0 || this.acc_num == "" 
          || this.amount == 0 || this.credit == 0) {
      console.log("saveOther - missing values. can't save .. ");
      alert("saveOther - missing values. can't save .. ");
      return;
    }    
    // var created_date = new Date();
    this.new_other = {
      id: 0, // Auto INC by DB !
      bank: this.bank,      
      branch: this.branch,
      acc_num: this.acc_num,
      amount: this.amount,
      credit: this.credit
      // date_create: new Date()
    };        
    this.othersService.addOtherData(this.new_other);
    this.clearForm();
    this.new_other={};    
    // redirect to others list/cubes:
    this.router.navigateByUrl('/route-to-others'); // route name from app-routing.module    
  }  

  clearForm() {
    this.bank = null;
    this.branch = null;    
    this.acc_num = "";
    this.amount = 0;
    this.credit = 0;   
    this.rec_id = 0;
  }

}
