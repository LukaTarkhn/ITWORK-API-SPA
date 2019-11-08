import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainUnauthorizedComponent } from './main-unauthorized/main-unauthorized.component';
import { MainAuthorizedComponent } from './main-authorized/main-authorized.component';
import { AuthorizationComponent } from './main-unauthorized/authorization/authorization.component';
import { RegistrationComponent } from './main-unauthorized/registration/registration.component';
import { MemberCardComponent } from './main-authorized/members/member-card/member-card.component';
import { MemberListComponent } from './main-authorized/members/member-list/member-list.component';
import { MemberDetailComponent } from './main-authorized/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './main-authorized/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberFollowersComponent } from './main-authorized/members/member-followers/member-followers.component';
import { MemberFollowersResolver } from './_resolvers/member-followers.resolver';
import { MemberFollowedOrganizationsResolver } from './_resolvers/member-followed-organizations.resolver';
import { MemberMessagesComponent } from './main-authorized/members/member-messages/member-messages.component';
import { MemberPhotoEditorComponent } from './main-authorized/members/member-edit/member-photo-editor/member-photo-editor.component';
import { MessagesListComponent } from './main-authorized/members/messages-list/messages-list.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { FollowResolver } from './_resolvers/follower.resolver';
import { OrganizationCardComponent } from './main-authorized/organization/organization-card/organization-card.component';
import { OrganizationListComponent } from './main-authorized/organization/organization-list/organization-list.component';
import { OrganizationCreateComponent } from './main-authorized/organization/organization-create/organization-create.component';
import { OrganizationEditComponent } from './main-authorized/organization/organization-edit/organization-edit.component';
import { OrganizationDetailComponent } from './main-authorized/organization/organization-detail/organization-detail.component';
import { OrganizationFollowersComponent } from './main-authorized/organization/organization-followers/organization-followers.component';
// tslint:disable-next-line: max-line-length
import { OrganizationPhotoEditorComponent } from './main-authorized/organization/organization-edit/organization-photo-editor/organization-photo-editor.component';
// tslint:disable-next-line: max-line-length
import { OrganizationHeaderphotoEditorComponent } from './main-authorized/organization/organization-edit/organization-headerphoto-editor/organization-headerphoto-editor.component';
import { OrganizationEditResolver } from './_resolvers/organization-edit.resolver';
import { OrganizationDetailResolver } from './_resolvers/organization-detail.resolver';
import { OrganizationListResolver } from './_resolvers/organization-list.resolver';
import { OrganizationFollowerResolver } from './_resolvers/organizationFollower.resolver';
import { OrganizationFollowersResolver } from './_resolvers/organization-followers.resolver';
import { VacancyListComponent } from './main-authorized/vacancy/vacancy-list/vacancy-list.component';

// services
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

// guards
import { AuthGuard } from './_guards/auth.guard';
import { AuthorizedGuard } from './_guards/authorized.guard';
import { UserService } from './_services/user.service';
import { PreventUnsavedChanged } from './_guards/prevent-unsaved-changes.guard';

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
      MemberDetailComponent,
      MemberEditComponent,
      MemberFollowersComponent,
      MemberPhotoEditorComponent,
      MemberMessagesComponent,
      MessagesListComponent,
      OrganizationCardComponent,
      OrganizationListComponent,
      OrganizationCreateComponent,
      OrganizationEditComponent,
      OrganizationDetailComponent,
      OrganizationFollowersComponent,
      OrganizationPhotoEditorComponent,
      OrganizationHeaderphotoEditorComponent,
      VacancyListComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
      PaginationModule.forRoot(),
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
      MemberListResolver,
      MemberEditResolver,
      MemberFollowersResolver,
      MemberFollowedOrganizationsResolver,
      OrganizationEditResolver,
      OrganizationDetailResolver,
      OrganizationListResolver,
      OrganizationFollowerResolver,
      OrganizationFollowersResolver,
      MessagesResolver,
      FollowResolver,
      PreventUnsavedChanged
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
