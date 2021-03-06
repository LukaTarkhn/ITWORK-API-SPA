import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainUnauthorizedComponent } from './main-unauthorized/main-unauthorized.component';
import { AuthorizationComponent } from './main-unauthorized/authorization/authorization.component';
import { RegistrationComponent } from './main-unauthorized/registration/registration.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthorizedGuard } from './_guards/authorized.guard';
import { MemberListComponent } from './main-authorized/members/member-list/member-list.component';
import { MemberDetailComponent } from './main-authorized/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './main-authorized/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberFollowersComponent } from './main-authorized/members/member-followers/member-followers.component';
import { MemberFollowersResolver } from './_resolvers/member-followers.resolver';
import { MemberFollowedOrganizationsResolver } from './_resolvers/member-followed-organizations.resolver';
import { MessagesListComponent } from './main-authorized/members/messages-list/messages-list.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { FollowResolver } from './_resolvers/follower.resolver';
import { OrganizationListComponent } from './main-authorized/organization/organization-list/organization-list.component';
import { OrganizationCreateComponent } from './main-authorized/organization/organization-create/organization-create.component';
import { OrganizationEditComponent } from './main-authorized/organization/organization-edit/organization-edit.component';
import { OrganizationEditResolver } from './_resolvers/organization-edit.resolver';
import { OrganizationDetailComponent } from './main-authorized/organization/organization-detail/organization-detail.component';
import { OrganizationFollowersComponent } from './main-authorized/organization/organization-followers/organization-followers.component';
import { OrganizationDetailResolver } from './_resolvers/organization-detail.resolver';
import { OrganizationListResolver } from './_resolvers/organization-list.resolver';
import { OrganizationFollowerResolver } from './_resolvers/organizationFollower.resolver';
import { OrganizationFollowersResolver } from './_resolvers/organization-followers.resolver';
import { PreventUnsavedChanged } from './_guards/prevent-unsaved-changes.guard';
import { VacancyListComponent } from './main-authorized/vacancy/vacancy-list/vacancy-list.component';


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
      { path: 'vacancy', component: VacancyListComponent},
      { path: 'specialists', component: MemberListComponent,
        resolve: {users: MemberListResolver}},
      { path: 'organizations', component: OrganizationListComponent,
        resolve: {organizations: OrganizationListResolver}},
      { path: ':id/:username', component: MemberDetailComponent,
        resolve: {
          user: MemberDetailResolver,
          follow: FollowResolver}},
      { path: 'edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanged]},
      { path: 'follow-list', component: MemberFollowersComponent,
        resolve: {
          users: MemberFollowersResolver,
          organizations: MemberFollowedOrganizationsResolver}},
      { path: 'conversations', component: MessagesListComponent,
        resolve: {messages: MessagesResolver}},
      { path: 'create-organization', component: OrganizationCreateComponent},
      { path: 'organization/edit/:userId/:id/:name', component: OrganizationEditComponent,
        resolve: {organization: OrganizationEditResolver},
        canDeactivate: [PreventUnsavedChanged]},
      { path: 'organization/:userId/:id/:name', component: OrganizationDetailComponent,
        resolve: {
          organization: OrganizationDetailResolver,
          follow: OrganizationFollowerResolver}},
      { path: 'organization-followers/:userId/:id', component: OrganizationFollowersComponent,
          resolve: {
            users: OrganizationFollowersResolver,
            organization: OrganizationDetailResolver}},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


