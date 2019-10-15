import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/_models/organization';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  organizations: Organization[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organizations = data.organizations;
    });
  }
}
