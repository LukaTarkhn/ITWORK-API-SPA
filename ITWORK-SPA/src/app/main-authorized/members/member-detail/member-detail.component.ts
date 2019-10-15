import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private authService: AuthService,
              private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
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

  isCurrentUser() {
    if (+this.authService.decodedToken.nameid === this.user.id) {
      return true;
     }
    return false;
  }
}
