import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/_models/organization';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organization = data.organization;
    });
  }

  isCurrentUser() {
    if (+this.authService.decodedToken.nameid === this.organization.userId) {
      return true;
     }
    return false;
  }
}
