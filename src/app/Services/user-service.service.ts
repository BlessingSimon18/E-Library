import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl= 'https://openlibrary.org/search.json';


  constructor(private http: HttpClient) { }

  addUser(user: any) {
    let users = [];
    if (localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users')!);
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  getSearchBooks(data:any): Observable<any>
  {
    console.log(data, 'word');
    const searchUrl = `${this.apiUrl}?title=${data.word}`;

    return this.http.get(searchUrl);
  }

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bookId}.json`);
  }

  private multimediaContent: any[] = [];

  addMultimediaContent(content: any) {
    this.multimediaContent.push(content);
  }

  getMultimediaContent() {
    return this.multimediaContent;
  }

  getMultimediaContentUser() {
    return this.getMultimediaContent();
  }



  // FILE SERVICE

  private videos: File[] = [];
  private pictures: File[] = [];
  private pdfs: File[] = [];
  private audios: File[] = [];

  uploadVideo(file: File): void {
    // Simulate video file upload logic (add to the videos array)
    console.log('Video file uploaded:', file);
    this.videos.push(file);
  }

  uploadPicture(file: File): void {
    // Simulate picture file upload logic (add to the pictures array)
    console.log('Picture file uploaded:', file);
    this.pictures.push(file);
  }

  uploadPdf(file: File): void {
    // Simulate PDF file upload logic (add to the pdfs array)
    console.log('PDF file uploaded:', file);
    this.pdfs.push(file);
  }

  uploadAudio(file: File): void {
    // Simulate audio file upload logic (add to the audios array)
    console.log('Audio file uploaded:', file);
    this.audios.push(file);
  }

  getVideos(): File[] {
    return this.videos;
  }

  getPictures(): File[] {
    return this.pictures;
  }

  getPdfs(): File[] {
    return this.pdfs;
  }

  getAudios(): File[] {
    return this.audios;
  }
}
