import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Services/auth.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private service:AuthService, private dialog:MatDialog){
    this.loadUser();
  }

  userlist: any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  loadUser(){
    this.service.getAll().subscribe(res=>{
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['id', 'username', 'email', 'role' ,'status', 'action'];

  updateUser(code:any){
    this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width: '50%',
      data:{
        usercode:code
      }
    })
  }

  openDialog(){

  }

}
