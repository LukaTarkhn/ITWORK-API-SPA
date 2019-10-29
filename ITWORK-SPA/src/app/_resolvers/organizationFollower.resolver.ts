import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { OrganizationFollow } from '../_models/organizationFollow';

@Injectable()

export class OrganizationFollowerResolver implements Resolve<OrganizationFollow> {


    constructor(private userService: UserService, private router: Router,
                private authService: AuthService, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<OrganizationFollow> {
        return this.userService.getOrganizationFollow(this.authService.decodedToken.nameid, route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/vacancy']);
                return of(null);
            })
        );
    }
}
