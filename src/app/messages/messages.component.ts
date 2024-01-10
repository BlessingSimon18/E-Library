import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messageItems: any[] = [];
  newMessageContent: string = '';

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.service.getMessages().subscribe(
      {
        next: (messages: any[]) => {
          this.messageItems = messages;
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP error status:', error.status);
            console.error('HTTP error message:', error.error);
          }
        }
      }
    );
  }

  postMessage(): void {
    const message = {
      content: this.newMessageContent,
      userId: 1,
    };

    this.service.sendMessage(message).subscribe(
      {
        next: () => {
          this.loadMessages(); // Reload messages after posting
          this.newMessageContent = ''; // Clear the input field
        },
        error: (error) => {
          console.error('Error posting message:', error);
        }
      }
    );
  }
}


