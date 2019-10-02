import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

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
import { MemberPhotoEditorComponent } from './main-authorized/members/member-edit/member-photo-editor/member-photo-editor.component';

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
      MemberPhotoEditorComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
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
      PreventUnsavedChanged
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
