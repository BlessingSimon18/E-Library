import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material.module';
import { AuthService } from 'src/app/Services/auth.service';
import { FileContentDialogComponent } from 'src/app/file-content-dialog/file-content-dialog.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  
  fileItems: any[] = [];
  messageItems: any[] = [];
  newMessageContent: string = '';

  constructor(private service: AuthService, private dialog: MatDialog) { 
    
  }
  ngOnInit(): void {
    this.loadUserFiles();
    this.loadMessages();
  }

 
    
  loadUserFiles(): void {
    this.service.getFiles().subscribe(
      {
        next: (files: any[]) => {
          this.fileItems = files;
        },
        error: (error) => {
          console.error('Error fetching user files:', error);
        }
      }
    );
  }

  

  loadMessages(): void {
    this.service.getMessages().subscribe(
      {
        next: (messages: any[]) => {
          this.messageItems = messages;
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
      }
    );
  }

  deleteFile(id: number): void {
    this.service.deleteFile(id).subscribe(
      {
        next: () => {
          this.loadUserFiles(); // Reload files after deletion
        },
        error: (error) => {
          console.error('Error deleting file:', error);
        }
      }
    );
  }

  postMessage(content: string): void {
    const message = {
      content: content,
      userId: 'librarian',
    };
  
    this.service.sendMessage(message).subscribe(
      {
        next: () => {
          this.loadMessages(); // Reload messages after posting
        },
        error: (error) => {
          console.error('Error posting message:', error);
        }
      }
    );
  }

  openFileContentDialog(fileItem: any): void {
    const dialogRef = this.dialog.open(FileContentDialogComponent, {
      data: { content: fileItem.content, fileType: fileItem.type }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      // Handle any actions after the dialog is closed
    });
  }

  // fetchMultimediaContent() {
  //   this.http.get('http://localhost:3000/files').subscribe(
  //     (response: any) => {
  //       this.multimediaContent = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching multimedia content:', error);
  //     }
  //   );
  // }
}
