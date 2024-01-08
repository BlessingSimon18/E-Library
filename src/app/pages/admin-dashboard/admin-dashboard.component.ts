import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  // providers: [UserServiceService]
})
export class AdminDashboardComponent implements OnInit{
// video: string;
// picture: string;

//   constructor(private userService: UserServiceService) {}

//   onFileAdded(fileType: string): void {
//     // Assuming you have a file input in your HTML, you can get the file from the event
//     const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//     const file = fileInput?.files?.[0];

//     if (file) {
//       switch (fileType) {
//         case 'video':
//           this.userService.uploadVideo(file);
//           break;
//         case 'picture':
//           this.userService.uploadPicture(file);
//           break;
//         case 'pdf':
//           this.userService.uploadPdf(file);
//           break;
//         case 'audio':
//           this.userService.uploadAudio(file);
//           break;
//         default:
//           console.error('Invalid file type');
//           break;
//       }
//     }
//   }


    content: any;
    multimediaContent: any[] = [];
    type='file';
  // getSafeUrl: any;
    // preview:'file';
    // fil: any[] = [];

    constructor(private http: HttpClient, private service:AuthService) {
      this.fetchMultimediaContent();
    }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }

    addContent() {
      const formData = new FormData();
     console.log(this.content);
     
      this.http.post('http://localhost:3000/files', this.content).subscribe(
      {
        next:(response:any)=>{
          console.log('File uploaded successfully:', response);
          // response = this.content;
          this.content = { type: '', file: response.file, preview: '' };
          this.fetchMultimediaContent();
        }, error:(error)=>{
          console.error('Error uploading file:', error);
        }
      }
      );

      // this.content = { type: '', file: null };
    }

    onFileChange(event: any) {
      const fileInput: HTMLInputElement | null = event.target;
       let file=event.files[0];
       let fileReader=new FileReader();

       fileReader.onloadend=function(){
        console.log(fileReader.result);
        
       }
      // if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // this.content={type:fileInput.files[0].type, file:fileInput.files[0].name}
       
      //   const reader = new FileReader();
      //   reader.onload = (e: any) => {
      //     this.content.preview = e.target.result;
      //     console.log(this.content);
          
      //   };
      //   //  reader.readAsDataURL(this.content);
         
      //   if (this.content.type.startsWith('image')) {
      //     reader.readAsDataURL(this.content);
      //   } else if (this.content.type.startsWith('video')) {
      //     this.content.preview =  reader.result as string;
      //   } else if (this.content.type.startsWith('audio')) {
      //     this.content.preview = reader.result as string;
      //   } else if (this.content.type === 'application/pdf') {
      //     this.content.preview =  reader.result as string;;
      //   } else if (this.content.type.startsWith('text')) {
      //     reader.readAsText(this.content);
      //   } else {
      //     this.content.preview = 'Preview not available for this file type.';
      //   }
      // }
    }

    // getSafeUrl(dataUrl:string): string {
      
    //   const blob = this.dataURItoBlob(dataUrl);
    //   const objectUrl = URL.createObjectURL(blob);
    //   return objectUrl;
    // }

    // dataURItoBlob(dataURI: string): Blob {
      
    //   const byteString = atob(dataURI.split(',')[1]);
    //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //   const ab = new ArrayBuffer(byteString.length);
    //   const ia = new Uint8Array(ab);
    //   for (let i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   return new Blob([ab], { type: mimeString });
    // }
    


    fetchMultimediaContent() {
    
      this.http.get('http://localhost:3000/files').subscribe(
       {
        next:(response:any)=>{
        this.multimediaContent = response;
       }, error:(error)=>{
        console.error('Error fetching multimedia content:', error);
       }
      }
      );
    }

}
