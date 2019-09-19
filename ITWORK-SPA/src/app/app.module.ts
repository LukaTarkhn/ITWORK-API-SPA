import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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


@NgModule({
   declarations: [
      AppComponent,
      MainAuthorizedComponent,
      MainUnauthorizedComponent,
      AuthorizationComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      AuthorizedGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
