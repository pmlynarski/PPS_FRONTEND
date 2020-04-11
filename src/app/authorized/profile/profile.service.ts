import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { default as urlData } from 'src/app/core/config';
import { IUserData } from '../../core/interfaces/user.interfaces';

@Injectable()
export class ProfileService {
  private readonly credentialsUrl: string;
  private readonly editUrl: string;

  constructor(private http: HttpClient) {
    this.editUrl = urlData.host + 'users/update_profile/';
    this.credentialsUrl = urlData.host + 'users/user_details/';
  }

  getUsersCredentials = (): Observable<IUserData> => this.http.get<IUserData>(this.credentialsUrl);

  sendUserData = (data): Observable<any> => this.http.put(this.editUrl, data);
}
