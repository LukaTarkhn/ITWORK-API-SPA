import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Organization } from '../_models/organization';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUsers(page?, itemsPerPage?, followesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (followesParam === 'Followers') {
      params = params.append('Followers', 'true');
    }

    if (followesParam === 'Followees') {
      params = params.append('Followees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
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

  sendFollow(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/follow/' + recipientId, {});
  }

  sendUnfollow(id: number, recipientId: number) {
    return this.http.delete(this.baseUrl + 'users/' + id + '/unfollow/' + recipientId);
  }
}
