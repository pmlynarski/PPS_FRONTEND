import { Injectable } from '@angular/core';
import { default as urlData } from 'src/app/core/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddGroupService {
  url = urlData.host + 'groups/create/';
  constructor(private http: HttpClient) { }
  addGroup = (data) => this.http.post(this.url, data, {observe: 'response'})
}
