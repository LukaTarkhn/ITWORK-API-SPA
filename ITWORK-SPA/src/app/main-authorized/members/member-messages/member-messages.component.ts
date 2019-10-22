import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authService: AuthService,
              private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessageThread();
  }

  loadMessageThread() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(currentUserId, this.recipientId)
      .pipe(
        tap(messages => {
          for (const index of messages) {
            if (index.isRead === false && index.recipientId === currentUserId) {
              this.userService.MarkAsRead(currentUserId, index.id);
            }
          }
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}
