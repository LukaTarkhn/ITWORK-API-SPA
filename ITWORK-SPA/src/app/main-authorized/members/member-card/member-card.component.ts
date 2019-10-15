import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendFollow(id: number) {
    this.userService.sendFollow(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have followed: ' + this.user.username);
    }, error => {
      this.alertify.error(error);
    });
  }

  sendUnfollow(id: number) {
    this.userService.sendUnfollow(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.warning('You have unfollowed: ' + this.user.username);
    }, error => {
      this.alertify.error(error);
    });
  }
}
