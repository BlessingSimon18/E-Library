import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerationForm: FormGroup;
  user: any = {};
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.minLength(10)]],
      dept: [null, Validators.required],
      faculty: [null, Validators.required]
    });
  }


  onSubmit() {
    if(this.registerationForm.value.password===this.registerationForm.value.confirmPassword){
      console.log(this.registerationForm);
      this.user = Object.assign(this.user, this.registerationForm.value);
      localStorage.setItem('Users', JSON.stringify(this.user));

    }else{
      
    }
  }

}
