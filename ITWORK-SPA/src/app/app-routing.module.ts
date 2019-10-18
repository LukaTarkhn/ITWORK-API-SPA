import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainUnauthorizedComponent } from './main-unauthorized/main-unauthorized.component';
import { AuthorizationComponent } from './main-unauthorized/authorization/authorization.component';
import { RegistrationComponent } from './main-unauthorized/registration/registration.component';
import { MainAuthorizedComponent } from './main-authorized/main-authorized.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthorizedGuard } from './_guards/authorized.guard';
import { MemberDetailComponent } from './main-authorized/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './main-authorized/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberFollowersComponent } from './main-authorized/members/member-followers/member-followers.component';
import { MemberFollowersResolver } from './_resolvers/member-followers.resolver';
import { MessagesListComponent } from './main-authorized/members/messages-list/messages-list.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { PreventUnsavedChanged } from './_guards/prevent-unsaved-changes.guard';
import { OrganizationCreateComponent } from './main-authorized/organization/organization-create/organization-create.component';
import { OrganizationEditComponent } from './main-authorized/organization/organization-edit/organization-edit.component';
import { OrganizationEditResolver } from './_resolvers/organization-edit.resolver';
import { OrganizationDetailComponent } from './main-authorized/organization/organization-detail/organization-detail.component';
import { OrganizationDetailResolver } from './_resolvers/organization-detail.resolver';
import { OrganizationListResolver } from './_resolvers/organization-list.resolver';


const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizedGuard],
    children: [
      { path: '', component: MainUnauthorizedComponent },
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
      { path: 'in', component: MainAuthorizedComponent,
        resolve: {
          users: MemberListResolver,
          organizations: OrganizationListResolver}},
      { path: 'in/:id', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}},
      { path: 'edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanged]},
      { path: 'follow-list', component: MemberFollowersComponent,
        resolve: {users: MemberFollowersResolver}},
      { path: 'conversations', component: MessagesListComponent,
      resolve: {messages: MessagesResolver}},
      { path: 'create-organization', component: OrganizationCreateComponent},
      { path: 'organization/edit', component: OrganizationEditComponent,
        resolve: {organization: OrganizationEditResolver},
        canDeactivate: [PreventUnsavedChanged]},
      { path: 'organization/:id', component: OrganizationDetailComponent,
        resolve: {organization: OrganizationDetailResolver}},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


