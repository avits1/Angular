import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  text = "test form page" ;
  contactForm: FormGroup;
  contact = {
      name:"",
      email: "",
      text:""
  };
  submitted = false;

  constructor() {
      this.createForm();
   }


  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

  createForm() {
      this.contactForm = new FormGroup({
          'name': new FormControl(this.contact.name, [
              Validators.required,
              Validators.minLength(4)
          ]),
          'email': new FormControl(this.contact.email, [
            Validators.required,
            Validators.email
        ]),
        'text': new FormControl(this.contact.text, Validators.required)
      });
  }
}
