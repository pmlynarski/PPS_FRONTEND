import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ForeignGroupService {
  constructor(private http: HttpClient) { }
  getGroupData(id: number) {
    const url = urlData.host + `groups/${id}/foreign/`;
    return this.http.post(url, {}, { observe: 'response' });
  }
  joinGroup = (id: number): any => {
    const url = urlData.host + `groups/${id}/join/`;
    return this.http.post(url, {}, { observe: 'response'});
  }
}
