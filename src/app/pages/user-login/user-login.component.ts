// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { RegisterComponent } from '../register/register.component';


// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent implements OnInit {

//   loginObj:any = {
//     email: '',
//     mobile: '',
//     password: ''
//   }
//   users: any[] = [];


//   constructor(private router:Router) { }

//   ngOnInit(): void {
//     const localData = localStorage.getItem('Users');
//     if (localData != null) {
//       this.users = JSON.parse(localData);
//     }
//   }

//   onLogin(){
//     const isUserExist = this.users.find(m => m.email == this.loginObj.email
//       && m.password == this.loginObj.password);
//       if(isUserExist != undefined){
//         alert('User Logged In Successfully');
//       }else {
//         alert('Wrong Credentials');
//       }
//   }
  
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../password-match.directives';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  signupUsers:any[] = [];

  signupObj:any={
    userName: '',
    email: '',
    password: ''
  };
  loginObj:any={
    userName: '',
    password: ''
  };

  registerationForm: FormGroup;
  user: any = {};
  
  

  constructor(private fb: FormBuilder, private router:Router, private service:AuthService) {}

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


    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
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

  // onSignup(){
  //   this.signupUsers.push(this.signupObj);
  //   localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
  //   this.signupObj = {
  //     userName: '',
  //     email: '',
  //     password: ''
  //   };
  // }

  onSignup(){
    if(this.registerationForm.valid && this.registerationForm.value.password===this.registerationForm.value.confirmPassword){
      console.log(this.registerationForm.valid);
      this.signupUsers.push(this.registerationForm.value);
      localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
      alert('Registered Successfully, Please contact admin to enable access');
      this.service.proceedRegister(this.registerationForm.value)
        .subscribe(res => {
          this.user = res;
        });
      this.registerationForm.reset();
      this.router.navigate(['userlog']);
    }else{
      alert('Please enter valid data');
    }

  }

  onLogin(){
    // debugger
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName
      && m.password == this.loginObj.password);
    if(isUserExist != undefined){
      if(this.loginObj.isactive){
        sessionStorage.setItem('username', this.loginObj.userName);
        sessionStorage.setItem('userrole', this.loginObj.role);

        alert('User Logged In Successfully');
        this.router.navigate(['userLayout'])
      }else{
        alert('Inactive User, Please contact admin');
      }
      
    }else {
      alert('Wrong Credentials');
    }
  }
}
