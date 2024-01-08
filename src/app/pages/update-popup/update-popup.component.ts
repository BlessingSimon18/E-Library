import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/Modules/material.module';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {

  editData:any;
  rolelist: any;

  constructor(private fb:FormBuilder, private service:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any, private toastr:ToastrService,
    private dialog:MatDialogRef<UpdatePopupComponent> ){

  }

  ngOnInit(): void {
    this.service.getAllRole().subscribe(res =>{
      this.rolelist=res; 
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.getByCode(this.data.usercode).subscribe(res=>{
        this.editData = res;
        this.registerationForm.setValue({id:this.editData.id, userName:this.editData.userName, email:this.editData.email,
        password:this.editData.password, confirmPassword:this.editData.confirmPassword,
        mobile:this.editData.mobile, dept:this.editData.dept, faculty:this.editData.faculty,
        role:this.editData.role, isactive:this.editData.isactive})
      }); 
    }
  }

  registerationForm = this.fb.group({
    id: this.fb.control(''),
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
    if(this.registerationForm.valid){
      this.service.updateUser(this.registerationForm.value.id, this.registerationForm.value).subscribe(res =>{
          this.toastr.success('Updated Successfully.');
          this.dialog.close();
        });
    }else{
      this.toastr.warning('Please Select Role.');
    }
  }

}
