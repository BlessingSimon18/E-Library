import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-file-content-dialog',
  templateUrl: './file-content-dialog.component.html',
  styleUrls: ['./file-content-dialog.component.css']
})
export class FileContentDialogComponent {
  sanitizedContentUrl: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    console.log('Dialog data:', data);

    this.sanitizedContentUrl = this.getSanitizedContentUrl(data.content, data.fileType);
    
   }
   
   

   getSanitizedContentUrl(content: string, fileType: string): SafeResourceUrl {
    switch (fileType) {
        case 'text/plain':
            return this.sanitizer.bypassSecurityTrustHtml(content);
        case 'image/jpeg':
        case 'image/png':
            return this.sanitizer.bypassSecurityTrustResourceUrl(content);
        // Add cases for other file types
        default:
            return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    }
}

  
}
