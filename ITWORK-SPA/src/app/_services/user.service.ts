import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Organization } from '../_models/organization';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  CreateOrganization(organization: Organization) {
    return this.http.post(this.baseUrl + 'users/organizations', organization);
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.baseUrl + 'users/organizations');
  }

  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.baseUrl + 'users/organizations/' + id);
  }

  updateOrganization(id: number, organization: Organization) {
    return this.http.put(this.baseUrl + 'users/organizations/' + id, organization);
  }

  deleteOrganization(id: number): Observable<Organization> {
    return this.http.delete<Organization>(this.baseUrl + 'users/organizations/' + id);
  }
}
