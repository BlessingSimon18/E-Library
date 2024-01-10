import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-content-dialog',
  templateUrl: './file-content-dialog.component.html',
  styleUrls: ['./file-content-dialog.component.css']
})
export class FileContentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
}
