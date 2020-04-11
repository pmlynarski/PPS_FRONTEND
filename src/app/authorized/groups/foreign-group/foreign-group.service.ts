import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { default as urlData } from 'src/app/core/config';
import { IGroupFull } from '../../../core/interfaces/groups.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ForeignGroupService {
  constructor(private http: HttpClient) {}

  getGroupData(id: number): Observable<IGroupFull> {
    const url = urlData.host + `groups/${id}/foreign/`;
    return this.http.post(url, {}).pipe(map((res: any): IGroupFull => ({ ...res, membersCount: res.members.length })));
  }

  joinGroup = (id: number): Observable<any> => {
    const url = urlData.host + `groups/${id}/join/`;
    return this.http.post(url, {});
  };
}
