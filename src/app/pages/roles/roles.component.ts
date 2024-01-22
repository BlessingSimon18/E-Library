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
    // const files:any=event.target.files;
    const files: FileList | null = event.target.files;
   
    if (files && files.length !== 0) {
 

      this.fileItems = []; // Clear the array before adding new files
      const file = files[0]
          const reader = new FileReader();
          
          reader.onloadend = (readerEvent) => {
            const data =  reader.result;
            if (data) {
               const payload = {
                name: file.name as any,
                content: data,
                type: file.type,
               }
              this.service.uploadFile(payload).subscribe(()=>
                
               {
                 this.loadFilesFromServer() // Reload files from the server after upload
               },
                 (err)=> {
                    console.log(err)
                  }
              )
              // this.fileItems.push({
              //   name: file.name as any,
              //   content: result as any,
              //   type: file.type,
              //   id: 0
              // });
              
              // this.dataSource.data =[...this.fileItems]; // Update table data
              // console.log(this.dataSource.data);
              
            } else {
              alert('Unable to read file content.');
            }
          };
          reader.readAsDataURL(file)
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
    // Check local storage for saved files
    const localFiles = JSON.parse(localStorage.getItem('File') || '[]');

    // Update the fileItems array and the data source
    this.fileItems = [...localFiles];
    this.dataSource.data = [...this.fileItems];
    
    this.service.getFiles().subscribe(
      {
        next:(files: FileItem[]) => {
          this.fileItems = files;
          this.dataSource.data = [...this.fileItems];
          // this.saveFilesToLocal();
          console.log('Files loaded from the server:', this.fileItems);
        
         // Log content of each file for debugging
        this.fileItems.forEach(file => console.log('File content:', file.content));
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
    console.log(fileItem.content);
    
   
    const dialogRef = this.dialog.open(FileContentDialogComponent, {
      data: {content: fileItem.content, fileType: fileItem.type }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
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
