import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/app/_models/organization';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit {
  @Input() organization: Organization;
  constructor() { }

  ngOnInit() {
  }

}
