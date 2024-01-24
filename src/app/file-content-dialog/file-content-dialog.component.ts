import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';


@Component({
  selector: 'app-file-content-dialog',
  templateUrl: './file-content-dialog.component.html',
  styleUrls: ['./file-content-dialog.component.css']
})
export class FileContentDialogComponent {


isImage: boolean = false;
isPdf: boolean = false;
isText: boolean = false;
isAudio: boolean = false;
isVideo: boolean = false;

constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: DialogRef) {
  this.detectFileType();
  console.log('Dialog data:', data);
}

private detectFileType(): void {
  const fileType = this.data.fileType;

  if (fileType.startsWith('image/')) {
    this.isImage = true;
  } else if (fileType === 'application/pdf') {
    this.isPdf = true;
  } else if (fileType.startsWith('text/')) {
    this.isText = true;
  }  else if (fileType.startsWith('audio/')) {
    this.isAudio = true;
  } else if (fileType.startsWith('video/')) {
    this.isVideo = true;
  }
}

}
