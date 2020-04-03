import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/config';

@Injectable()
export class RegisterService {
    registerUrl = urlData.host + 'users/register/';
    constructor(private http: HttpClient) { }
    registerUser(data) {
        return this.http.post(this.registerUrl, data, { observe: 'response' });
    }
}
