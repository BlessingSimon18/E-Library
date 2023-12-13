import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { passwordMatchValidator } from '../password-match.directives';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerationForm: FormGroup;
  user: any = {};
  constructor(private fb: FormBuilder, private userService: UserServiceService,
    private toastr: ToastrService, private service:AuthService, 
    private router:Router) { }

  ngOnInit(): void {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.minLength(10)]],
      dept: [null, Validators.required],
      faculty: [null, Validators.required],
      role: this.fb.control(''),
      isactive: this.fb.control(false)  
    }, {
      validators: passwordMatchValidator
    });

    // const localData = localStorage.getItem('Users');
    // if(localData != null){
    //   this.user = JSON.parse(localData);
    // }
  }

  get email() {
    return this.registerationForm.controls['email'];
  }
  get password() {
    return this.registerationForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerationForm.controls['confirmPassword'];
  }

  onSubmit() {
    if(this.registerationForm.value.password===this.registerationForm.value.confirmPassword){
      console.log(this.registerationForm);
      this.user = Object.assign(this.user, this.registerationForm.value);
      this.userService.addUser(this.user);
      this.registerationForm.reset();

      this.service.proceedRegister(this.registerationForm.value)
      .subscribe(res => {
        this.toastr.success('Please contact Librarian to enable access', 
        'Registered Successfully');
        this.user = res;
        this.router.navigate(['userlog']);
      });
    } else{
      this.toastr.warning('Please enter valid data');
    }
  }


  // onSubmit(){
  //   this.user.push(this.registerationForm.value);
  //   localStorage.setItem('Users', JSON.stringify(this.user));
  //   this.registerationForm.value
  // }
  

}
