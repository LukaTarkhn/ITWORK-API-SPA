import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { Organization } from 'src/app/_models/organization';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {
  @Input() organizations: Organization[];
  organization: Organization;
  createForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.createForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private router: Router, private route: ActivatedRoute,
              private userService: UserService, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createOrganizationForm();
  }

  createOrganizationForm() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
    });
  }

  CreateOrganization() {
      this.organization = Object.assign({}, this.createForm.value);
      this.userService.CreateOrganization(this.organization).subscribe(() => {
        this.alertify.success('Organization has been created');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/organization/edit']);
      });
  }
}
