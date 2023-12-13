import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl='http://localhost:3000/users';
  // registerationForm: FormGroup;

  getAll(){
    return this.http.get(this.apiurl);
  }
  getByCode(code:any){
    return this.http.get(this.apiurl +'/'+code);
  }
// post mtd
  proceedRegister(inputdata: any){
    return this.http.post(this.apiurl, inputdata);
  }
  // to update user
  updateUser(code:any, inputdata: any){
    return this.http.put(this.apiurl+'/'+code, inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  getUserrole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }

}
