import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Organization } from 'src/app/_models/organization';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  organizations: Organization[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.userService.getOrganizations().subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
    }, error => {
      this.alertify.error(error);
    });
  }

}
