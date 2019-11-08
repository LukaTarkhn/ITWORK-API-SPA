import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/_models/organization';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrganizationFollow } from 'src/app/_models/organizationFollow';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  follow: OrganizationFollow;
  constructor(private route: ActivatedRoute, private authService: AuthService,
              private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organization = data.organization;

      this.follow = data.follow;
    });
  }

  sendOrganizationFollow(id: number) {
    this.userService.sendOrganizationFollow(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have followed: ' + this.organization.name);
    }, error => {
      this.alertify.error(error);
    });
  }

  sendOrganizationUnfollow(id: number) {
    this.userService.sendOrganizationUnfollow(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.warning('You have unfollowed: ' + this.organization.name);
    }, error => {
      this.alertify.error(error);
    });
  }

  isFollowed() {
    if (this.follow != null) {
      if (this.follow.followeeId > 0) {
        return true;
      }
    }
    return false;
  }

  isCurrentUser() {
    if (+this.authService.decodedToken.nameid === this.organization.userId) {
      return true;
     }
    return false;
  }
}
