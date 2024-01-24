import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-selection',
  templateUrl: './cancel-selection.component.html',
  styleUrls: ['./cancel-selection.component.css']
})
export class CancelSelectionComponent {

  constructor(public dialogRef: MatDialogRef<CancelSelectionComponent>) { }

  confirmCancel(): void {
    this.dialogRef.close(true); // User confirmed canceling the selection
  }

  cancel(): void {
    this.dialogRef.close(); // User canceled the dialog
  }

}
