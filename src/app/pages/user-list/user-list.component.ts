import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  searchForm: FormGroup;
  searchResults: any[] = [];
  multimediaContent: any[] = [];

  constructor(private fb:FormBuilder, private userService: UserServiceService, private router: Router) {
    this.searchForm = this.fb.group({
      word: ['']
    });

    this.multimediaContent = this.userService.getMultimediaContentUser();
  }

  search() {
    const queryParams = this.searchForm.value;
    this.userService.getSearchBooks(queryParams).subscribe(
      (data: any) => {
        this.searchResults = data.docs;
        console.log('Search results:', this.searchResults);
      },
      error => {
        console.error('Error searching books:', error);
      }
    );
  }

  navigateToBookDetail(bookId: string) {
    this.router.navigate([`/book/${bookId}`]);
  }

  
  
}
