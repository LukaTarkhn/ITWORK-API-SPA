import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainUnauthorizedComponent } from './main-unauthorized/main-unauthorized.component';
import { MainAuthorizedComponent } from './main-authorized/main-authorized.component';
import { AuthorizationComponent } from './main-unauthorized/authorization/authorization.component';
import { RegistrationComponent } from './main-unauthorized/registration/registration.component';

// services
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

// guards
import { AuthGuard } from './_guards/auth.guard';
import { AuthorizedGuard } from './_guards/authorized.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './main-authorized/members/member-card/member-card.component';
import { MemberListComponent } from './main-authorized/members/member-list/member-list.component';
import { MemberDetailComponent } from './main-authorized/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      MainAuthorizedComponent,
      MainUnauthorizedComponent,
      AuthorizationComponent,
      RegistrationComponent,
      MemberCardComponent,
      MemberListComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      AuthorizedGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
