import { Component, OnInit } from '@angular/core';
import { OthersDataService } from '../others-data.service';
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
      // console.log("got object other number:" + to_update.acc_num);
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
    console.log("updateOther - updating other " + other_data.acc_num);
    this.clearForm();   
    this.router.navigateByUrl('/others-comp'); // redirect back to others list/cubes
  }

  // Add Other !
  saveOther() {     
    if (this.bank == 0 || this.branch == 0 || this.acc_num == "" 
          || this.amount == 0 || this.credit == 0) {
      console.log("saveOther - missing values. can't save .. ");
      alert("saveOther - missing values. can't save .. ");
      return;
    }
    console.log("saveOther - started  for other num: " + this.acc_num);
    this.new_other = {
      id: 0, // Auto INC by DB !
      bank: this.bank,      
      branch: this.branch,
      acc_num: this.acc_num,
      amount: this.amount,
      credit: this.credit
    };        
    this.othersService.addOtherData(this.new_other);
    this.clearForm();
    this.new_other={};    
    this.router.navigateByUrl('/others-comp'); // redirect to others list/cubes
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
