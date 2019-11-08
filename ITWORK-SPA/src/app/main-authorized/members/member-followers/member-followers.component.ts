import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Organization } from 'src/app/_models/organization';

@Component({
  selector: 'app-member-followers',
  templateUrl: './member-followers.component.html',
  styleUrls: ['./member-followers.component.css']
})
export class MemberFollowersComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  organizationPagination: Pagination;
  followersParam: string;
  organizationFollowersParam: string;
  organizations: Organization[];

  constructor(private userService: UserService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;

      this.organizations = data.organizations.result;
      this.organizationPagination = data.organizations.pagination;
    });
    this.followersParam = 'Followers';
    this.organizationFollowersParam = 'Followees';

    this.loadOrganizations();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.followersParam)
    .subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  organizationPageChanged(event: any): void {
    this.organizationPagination.currentPage = event.page;
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.userService.getOrganizations(this.organizationPagination.currentPage, this.organizationPagination.itemsPerPage,
     this.organizationFollowersParam)
    .subscribe(
      (res: PaginatedResult<Organization[]>) => {
        this.organizations = res.result;
        this.organizationPagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

}
