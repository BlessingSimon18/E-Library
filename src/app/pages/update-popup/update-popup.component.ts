import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent {


  constructor(private fb:FormBuilder){

  }

  registerationForm = this.fb.group({
    userName: [null],
    email: [null],
    password: [null],
    confirmPassword: [null],
    mobile: [null],
    dept: [null],
    faculty: [null],
    role: this.fb.control('', Validators.required),
    isactive: this.fb.control(false)  
  });
  updateUser(){
    
  }

}
