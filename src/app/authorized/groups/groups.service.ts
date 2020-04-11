import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { default as urlData } from 'src/app/core/config';
import { IGroupFull } from '../../core/interfaces/groups.interfaces';

@Injectable()
export class GroupsService {
  private readonly myPostsUrl: string;

  constructor(private http: HttpClient) {
    this.myPostsUrl = urlData.host + 'groups/my_groups/?page=1';
  }

  getUsersGroups(): Observable<object> {
    return this.http.get(this.myPostsUrl).pipe(
      map((response: any) => ({
        ...response,
        results: [...response.results].map((element): IGroupFull => ({ ...element, membersCount: element.members.length })),
      })),
    );
  }
}
