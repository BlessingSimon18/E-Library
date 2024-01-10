import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl='http://localhost:3000/users';
  fileUrl='http://localhost:3000/files';
  messageUrl = 'http://localhost:3000/messages';
  // registerationForm: FormGroup;

  getFile(){
    return this.http.get(this.fileUrl);
  }
  getAll(){
    return this.http.get(this.apiurl);
  }
  getByCode(code:any){
    return this.http.get(this.apiurl +'/'+code);
  }
  getAllRole(){
    return this.http.get('http://localhost:3000/role');
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

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('file', file, file.type);

    return this.http.post<any[]>(`${this.fileUrl}/files`, formData);
  }

  // getUploadedFiles(): Observable<any[]> {
  //   return this.http.get<any[]>(this.fileUrl);
  // }

  // private fileItems: any[] = [];

  // addFileItems(content: any) {
  //   return this.http.put(this.fileUrl, content);
  // }

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.fileUrl);
  }

  deleteFile(id: number): Observable<any> {
    const deleteUrl = `${this.fileUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.messageUrl);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post<any[]>(this.messageUrl, message);
  }

  deleteMessage(id: number): Observable<any> {
    const deleteUrl = `${this.messageUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }
}
