import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/_models/organization';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  organizations: Organization[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organizations = data.organizations.result;
      this.pagination = data.organizations.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.userService.getOrganizations(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe(
      (res: PaginatedResult<Organization[]>) => {
        this.organizations = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

}
