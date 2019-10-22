import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Organization } from 'src/app/_models/organization';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  organization: Organization;
  organizations: Organization[];
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private authService: AuthService,
              private alertify: AlertifyService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.organization = data.organization;
    });
  }

  updateOrganization() {
    this.userService.updateOrganization(this.authService.decodedToken.nameid, this.organization.id, this.organization)
    .subscribe( () => {
      this.alertify.success('Updated!');
      this.editForm.reset(this.organization);
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteOrganization(id: number) {
  this.alertify.confirm('Are you sure?', () => {
    this.userService.deleteOrganization(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.warning('You delete organization: ' + this.organization.name);
      this.router.navigate(['/in']);
    }, error => {
      this.alertify.error(error);
    });
  });
  }
}
