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
    console.log(this.loginObj);
    
    if(this.loginObj.userName == 'librarian' && this.loginObj.password == 'librarian'){
      sessionStorage.setItem('username', this.loginObj.userName);
      // sessionStorage.setItem('userrole', this.loginObj.role);
      this.router.navigateByUrl('/adminLayout');
    }else{
      alert("You shouldn't try to breach protocols😏");
      this.router.navigate(['userlog']);
    }
  }
}
