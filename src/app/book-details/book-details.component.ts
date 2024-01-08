import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  bookId: string | null =null;
  bookDetails: any;

  constructor(private route: ActivatedRoute, private userService:UserServiceService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      if (this.bookId) {
        this.userService.getBookDetails(this.bookId).subscribe(
          (data: any) => {
            this.bookDetails = data;
          },
          error => {
            console.error('Error fetching book details:', error);
          }
        );
      }
    });
  }
  

}
