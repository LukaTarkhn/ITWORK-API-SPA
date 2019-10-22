import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Organization } from '../_models/organization';

@Injectable()

export class OrganizationEditResolver implements Resolve<Organization> {
    constructor(private userService: UserService, private router: Router,
                private authService: AuthService, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Organization> {
        return this.userService.getOrganization(this.authService.decodedToken.nameid, route.params.id, route.params.name).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data');
                this.router.navigate(['/in']);
                return of(null);
            })
        );
    }
}
