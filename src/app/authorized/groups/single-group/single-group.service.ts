import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { default as urlData } from 'src/app/core/config';
import { IGroupFull } from '../../../core/interfaces/groups.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SingleGroupService {
  constructor(private http: HttpClient) {}

  getGropuMembers: any = (id: number) => {
    const url = urlData.host + `groups/${id}/members/`;
    return this.http.post(url, {});
  }

  getGroupData(id: number): Observable<IGroupFull> {
    const url = urlData.host + `groups/${id}/`;
    return this.http.get(url).pipe(map((response: any) => ({ ...response, membersCount: response.members.length })));
  }

  getGroupPosts(id: number): Observable<any> {
    const url = urlData.host + `posts/group/${id}/?page=1`;
    return this.http.get(url).pipe(
      map((response: any) => ({
        ...response,
        results: [...response.results].map((element) => ({ ...element, date_posted: new Date(element.date_posted).toLocaleString() })),
      })),
    );
  }

  getFurtherGroupPosts(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((response: any) => ({
        ...response,
        results: [...response.results].map((element) => ({ ...element, date_posted: new Date(element.date_posted) })),
      })),
    );
  }

  addPost = (groupId: number, data) => {
    const url = urlData.host + `posts/create/${groupId}/`;
    return this.http
      .post(url, data)
      .pipe(map((response: any) => ({ ...response, date_posted: new Date(response.date_posted).toLocaleString() })));
  };

  isGroupOwner = (id: number) => {
    const url = urlData.host + `groups/${id}/is_owner/`;
    return this.http.get(url, { observe: 'response' });
  };

  deleteGroup = (id: number) => {
    const url = urlData.host + `groups/${id}/delete/`;
    return this.http.delete(url);
  };

  leaveGroup = (id: number) => {
    const url = urlData.host + `groups/${id}/leave/`;
    return this.http.post(url, {}, { observe: 'response' });
  };
}
