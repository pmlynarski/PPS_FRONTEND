import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class SingleGroupService {
  constructor(private http: HttpClient) {}

  getGroupData(id: number) {
    const url = urlData.host + `groups/${id}/`;
    return this.http.get(url, { observe: 'response' });
  }

  getGroupPosts(id: number) {
    const url = urlData.host + `posts/group/${id}/?page=1`;
    return this.http.get(url, { observe: 'response' });
  }

  getFurtherGroupPosts(url: string) {
    return this.http.get(url, { observe: 'response' });
  }

  addPost = (groupId: number, data) => {
    const url = urlData.host + `posts/create/${groupId}/`;
    return this.http.post(url, data, { observe: 'response' });
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
