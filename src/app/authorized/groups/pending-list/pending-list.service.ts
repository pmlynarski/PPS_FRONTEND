import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { default as config } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class PendingListService {
  constructor(private http: HttpClient) {}

  getPendingList(groupId: number): Observable<any> {
    const listUrl = config.host + `groups/${groupId}/pending/`;
    return this.http.post(listUrl, {});
  }

  getFurtherList(url: string): Observable<any> {
    return this.http.post(url, {});
  }

  acceptMember(groupId: number, userId: number) {
    const acceptUrl = config.host + `groups/${groupId}/manage/`;
    return this.http.post(acceptUrl, { id: userId });
  }

  declineMember(groupId: number, userId: number) {
    const declineUrl = config.host + `groups/${groupId}/manage/`;
    return this.http.request('delete', declineUrl, { body: { id: userId } });
  }
}
