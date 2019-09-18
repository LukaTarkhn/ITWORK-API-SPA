import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainUnauthorizedComponent } from './main-unauthorized/main-unauthorized.component';
import { AuthorizationComponent } from './main-unauthorized/authorization/authorization.component';
import { RegistrationComponent } from './main-unauthorized/registration/registration.component';
import { MainAuthorizedComponent } from './main-authorized/main-authorized.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainUnauthorizedComponent },
  {
    path: '',
    children: [
      { path: 'sign_in', component: AuthorizationComponent },
      { path: 'sign_up', component: RegistrationComponent }
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // links that can't be viewed without authentication
      { path: 'in', component: MainAuthorizedComponent},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


