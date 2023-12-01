import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor( private router:Router) { }

  ngOnInit(): void {
    
  }

  onLogin(){
    if(this.loginObj.userName == 'librarian' && this.loginObj.password == 'librarian'){
      this.router.navigateByUrl('adminLayout')
    }
  }
}
