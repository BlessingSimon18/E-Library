import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-content-dialog',
  templateUrl: './file-content-dialog.component.html',
  styleUrls: ['./file-content-dialog.component.css']
})
export class FileContentDialogComponent implements OnInit{
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  data: { fileType: string, content: string };

  ngOnInit(): void {
    // Initialize your component
    console.log('File Type:', this.data.fileType);
    console.log('Content:', this.data.content);
  }

  isTextType(fileType: string): boolean {
    return fileType.startsWith('text/');
  }

  isImageType(fileType: string): boolean {
    return fileType.startsWith('image/');
  }

  isVideoType(fileType: string): boolean {
    return fileType.startsWith('video/');
  }

  isAudioType(fileType: string): boolean {
    return fileType.startsWith('audio/');
  }

  isPdfType(fileType: string): boolean {
    return fileType === 'application/pdf';
  }

}
