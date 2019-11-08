import { Component, OnInit } from '@angular/core';
import { OrganizationFollow } from 'src/app/_models/organizationFollow';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Organization } from 'src/app/_models/organization';

@Component({
  selector: 'app-organization-followers',
  templateUrl: './organization-followers.component.html',
  styleUrls: ['./organization-followers.component.css']
})
export class OrganizationFollowersComponent implements OnInit {
  users: User[];
  organization: Organization;
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;

      this.organization = data.organization;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadFollowers();
  }

  loadFollowers() {
    this.userService.getOrganizationFollowers(this.organization.id, this.pagination.currentPage, this.pagination.itemsPerPage)
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

}
