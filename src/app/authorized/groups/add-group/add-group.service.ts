import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { default as urlData } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class AddGroupService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = urlData.host + 'groups/create/';
  }

  addGroup = (data): Observable<HttpResponse<any>> => this.http.post(this.url, data, { observe: 'response' });
}
