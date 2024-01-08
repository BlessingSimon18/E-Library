import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Services/auth.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/Modules/material.module';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  ngOnInit(): void {
    // this.loadUser();
  }
  constructor(private service:AuthService, private dialog:MatDialog, private http:HttpClient){
    this.loadUser();
  }

  userlist: any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  loadUser(){
    // this.http.get('http://localhost:3000/users').subscribe((res=>{
    //   console.log(res);
      
    // }))
    this.service.getAll().subscribe(res=>{
      console.log(res);
      
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['id', 'username', 'email', 'role' ,'status', 'action'];

  updateUser(code:any){
    console.log(code);
    
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width: '50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.loadUser();
    });
  }

  openDialog(){
  
  }

}
