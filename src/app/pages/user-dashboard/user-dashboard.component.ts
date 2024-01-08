import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  // @Input() files: File[];
  // @Input() title: string;

  multimediaContent: any[] = [];


  constructor(private userService: UserServiceService, private http: HttpClient) {
    this.fetchMultimediaContent();
  }

  fetchMultimediaContent() {
    this.http.get('http://localhost:3000/files').subscribe(
      (response: any) => {
        this.multimediaContent = response;
      },
      (error) => {
        console.error('Error fetching multimedia content:', error);
      }
    );
  }
}
