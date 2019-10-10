import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/_models/organization';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organization = data.organization;
    });
  }

}
