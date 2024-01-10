import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FileItem } from 'src/app/file-item.model';
import { FileContentDialogComponent } from 'src/app/file-content-dialog/file-content-dialog.component';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{

  fileItems: FileItem[] = [];
  

  displayedColumns: string[] = ['icon', 'name', 'type', 'actions'];
  dataSource = new MatTableDataSource<FileItem>(this.fileItems);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 

  constructor(public dialog: MatDialog, private service: AuthService) {
    
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.loadFilesFromServer();
  }

  onFileChange(event: any): void {
    const files: FileList | null = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      
      this.service.uploadFile(file).subscribe(
        {
          next:(response:any)=>{
            console.log('File uploaded successfully:', response);
            // const fileItem: FileItem = {
            //   id: response.id,
            //   name: file.name,
            //   type: file.type,
            //   content: response.content
            // };
            
            // this.fileItems.push(response);
            // this.saveFilesToLocal();
            // this.dataSource.data = [...this.fileItems];
            this.loadFilesFromServer(); // Reload files from the server after upload
          }, error:(error)=>{
            console.error('Error uploading file:', error);
          }
        }
      );

      if (this.isSupportedFileType(file.type)) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const result = readerEvent.target?.result;
          if (result) {
            this.fileItems.push({
              name: file.name,
              content: result as string,
              type: file.type,
              id: 0
            });
            
            this.dataSource.data =[...this.fileItems]; // Update table data
          } else {
            alert('Unable to read file content.');
          }
        };

        if (file.type.startsWith("text/") || file.type.startsWith("image/") || file.type.startsWith("video/") || file.type === 'application/pdf') {
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("audio/")) {
          reader.readAsDataURL(file);
          // Handle audio files
          // You can implement audio-specific handling here
        } else {
          alert(`Unsupported file type: ${file.type}`);
        }
      } else {
        alert(`Unsupported file type: ${file.type}`);
      }
    }
  }

  deleteFile(id: number): void {
    this.service.deleteFile(id).subscribe(
      {
        next:() => {
          // this.fileItems = this.fileItems.filter(item => item.id !== id);
          // this.saveFilesToLocal();
          // this.dataSource.data = [...this.fileItems];
          this.loadFilesFromServer(); // Reload files from the server after deletion
        },
        error: (error) => {
          console.error('Error deleting file:', error);
        }
      }
    );
  }

  // deleteFile(index: number): void {
  //   this.fileItems.splice(index, 1);
  //   this.saveFilesToLocal();
  //   this.dataSource.data = [...this.fileItems];
  // }

  private loadFilesFromServer(): void {
    this.service.getFiles().subscribe(
      {
        next:(files: FileItem[]) => {
          this.fileItems = files;
          this.dataSource.data = [...this.fileItems];
          this.saveFilesToLocal();
        },
        error:(error) => {
          console.error('Error fetching files:', error);
        }
      }
    );
  }

  private saveFilesToLocal(): void {
    localStorage.setItem('File', JSON.stringify(this.fileItems));
  }

  openFileContentDialog(fileItem: FileItem): void {
    const dialogRef = this.dialog.open(FileContentDialogComponent, {
      data: { content: fileItem.content, fileType: fileItem.type }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      // Handle any actions after the dialog is closed
    });  
  }

  private isSupportedFileType(fileType: string): boolean {
    return (
      fileType.startsWith("text/") ||
      fileType.startsWith("image/") ||
      fileType.startsWith("video/") ||
      fileType.startsWith("audio/") ||
      fileType === 'application/pdf'
    );
  }

  getFileIcon(fileType: string): string {
    if (!fileType) {
      // Handle the case where fileType is undefined or null
      return 'insert_drive_file';
    }
  
    if (fileType.startsWith("text/")) {
      return 'description';
    } else if (fileType.startsWith("image/")) {
      return 'image';
    } else if (fileType.startsWith("video/")) {
      return 'videocam';
    } else if (fileType === 'application/pdf') {
      return 'picture_as_pdf';
    } else if (fileType.startsWith("audio/")) {
      return 'audiotrack';
    } else {
      return 'insert_drive_file';
    }
  }
  
}
