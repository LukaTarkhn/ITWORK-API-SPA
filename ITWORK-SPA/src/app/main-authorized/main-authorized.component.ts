import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Organization } from '../_models/organization';
import { PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-main-authorized',
  templateUrl: './main-authorized.component.html',
  styleUrls: ['./main-authorized.component.css']
})
export class MainAuthorizedComponent implements OnInit {
  organizations: Organization[];
  photoUrl: string;
  userId: number;
  username: string;
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    this.userId = this.authService.decodedToken.nameid;
    this.username = this.authService.currentUser.username;

    this.loadOrganizations();
  }

  loadOrganizations() {
    this.userService.getOrganizations()
    .subscribe(
      (res: PaginatedResult<Organization[]>) => {
        this.organizations = res.result;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/']);
  }

}
