import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Organization } from '../_models/organization';

@Injectable()

export class MemberFollowedOrganizationsResolver implements Resolve<Organization[]> {
    pageNumber = 1;
    pageSize = 2;
    organizationFollowersParam = 'Followees';

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Organization[]> {
        return this.userService.getOrganizations(this.pageNumber, this.pageSize, this.organizationFollowersParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/vacancy']);
                return of(null);
            })
        );
    }
}
