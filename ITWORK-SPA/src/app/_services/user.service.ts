import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Organization } from '../_models/organization';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';


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

  getUser(id: number, username: string): Observable<User> {
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

  getOrganizations(page?, itemsPerPage?, followesParam?): Observable<PaginatedResult<Organization[]>> {
    const paginatedResult: PaginatedResult<Organization[]> = new PaginatedResult<Organization[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Organization[]>(this.baseUrl + 'users/organizations', { observe: 'response', params})
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

  getOrganization(userId: number, id: number, name: string): Observable<Organization> {
    return this.http.get<Organization>(this.baseUrl + 'users/organizations/' + userId + '/' + id);
  }

  updateOrganization(userId: number, id: number, organization: Organization) {
    return this.http.put(this.baseUrl + 'users/organizations/' + userId + '/' + id, organization);
  }

  deleteOrganization(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/organizations/' + userId + '/' + id);
  }

  sendOrganizationFollow(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/organizations/' + id + '/follow/' + recipientId, {});
  }

  sendOrganizationUnfollow(id: number, recipientId: number) {
    return this.http.delete(this.baseUrl + 'users/organizations/' + id + '/unfollow/' + recipientId);
  }

  getOrganizationFollow(id: number, recipientId: number): Observable<Organization> {
    return this.http.get<Organization>(this.baseUrl + 'users/organizations/' + id + '/follows/' + recipientId);
  }

  sendFollow(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/follow/' + recipientId, {});
  }

  sendUnfollow(id: number, recipientId: number) {
    return this.http.delete(this.baseUrl + 'users/' + id + '/unfollow/' + recipientId);
  }

  getFollow(id: number, recipientId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id + '/follows/' + recipientId);
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  MarkAsRead(userId: number, messageId: number) {
    this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
