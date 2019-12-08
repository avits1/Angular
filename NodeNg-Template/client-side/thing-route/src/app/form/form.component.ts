import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  
  name="test1";
  email="test11@gmail.com";  
  phone="11111";
  text_msg="this is text message"; 
  
  sendMsg() {
    console.log("msg was sent !");
  }

  constructor() { }

  ngOnInit() {
  }

}
