import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/core/config';

@Injectable()
export class GroupsService {
  myPostsUrl = urlData.host + 'groups/my_groups/?page=1';

  constructor(private http: HttpClient) {}

  getUsersGroups() {
    return this.http.get(this.myPostsUrl, { observe: 'response' });
  }
}
