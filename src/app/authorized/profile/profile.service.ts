import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/config';

@Injectable()
export class ProfileService {
    credentialsUrl = urlData.host + 'users/user_details/';
    editUrl = urlData.host + 'users/update_profile/';
    constructor(private http: HttpClient) { }
    getUsersCredentials: any = () => this.http.get(this.credentialsUrl, { observe: 'response' });
    sendUserData: any = (data) => this.http.put(this.editUrl, data, {observe: 'response'});
}
