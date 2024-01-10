import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messageItems: any[] = [];

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
        }
      }
    );
  }
}
