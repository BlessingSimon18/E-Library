import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material.module';
import { AuthService } from 'src/app/Services/auth.service';
import { FileContentDialogComponent } from 'src/app/file-content-dialog/file-content-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  
  fileItems: any[] = [];
  messageItems: any[] = [];
  newMessageContent: string = '';
  filteredFileItems: any[] = [];
  newFileTypeCount: number = 0; // Track the count of new file types
  showMessages: boolean = false;
  combinedItems: any[] = []; 

  constructor(private service: AuthService, private dialog: MatDialog) { 
    
  }
  ngOnInit(): void {
    this.loadUserFiles();
    this.loadMessages();
  }

  getWelcomeMessage(): string {
    const username = sessionStorage.getItem('username');
    return username ? ` ${username}!` : 'Welcome!!';
  }
  
    
  loadUserFiles(): void {
    this.service.getFiles().subscribe(
      {
        next: (files: any[]) => {
          const newFileTypes = this.detectNewFileTypes(files);
          this.newFileTypeCount = newFileTypes.length;
          this.fileItems = files;
          this.filteredFileItems = [...this.fileItems]; // Initialize filtered files
          // this.combineItems();
        },
        error: (error) => {
          console.error('Error fetching user files:', error);
        }
      }
    );
  }


  detectNewFileTypes(newFiles: any[]): string[] {
    const existingFileTypes = this.fileItems.map((file) => file.type);
    return newFiles
      .map((file) => file.type)
      .filter((type) => !existingFileTypes.includes(type));
  }
  

  filterFiles(fileType: string): void {
    if (fileType === 'all') {
      this.filteredFileItems = [...this.fileItems];
    } else {
      this.filteredFileItems = this.fileItems.filter(
        (file) => file.type && file.type.startsWith(fileType + '/')
      );
    }
  }

 

  
  
  

  loadMessages(): void {
    this.service.getMessages().subscribe(
      {
        next: (messages: any[]) => {
          this.messageItems = messages;
          // this.combineItems();
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

  toggleMessages() {
    this.showMessages = !this.showMessages;

    if (this.showMessages) {
      // If toggling to messages, clear fileItems
      this.fileItems = [];
      this.filteredFileItems = [];
    } else {
      // If toggling back, reload both files and messages
      this.loadUserFiles();
      this.loadMessages();
    }
  }

  //  Combine fileItems and messageItems into combinedItems
  // combineItems(): void {
  //   this.combinedItems = [...this.fileItems, ...this.messageItems];
  //   this.filterFiles('all'); // Apply any current filters
  // }

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
