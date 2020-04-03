import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as configData } from 'src/app/config';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
    loginUrl = configData.host + 'users/login/';
    private readonly TOKEN = 'Token';
    loggedUser: string;
    constructor(private http: HttpClient) { }

    login(data): Observable<boolean> {
        return this.http.post<any>(this.loginUrl, data, { observe: 'response' }).pipe(
            tap(response => this.doLoginUser(response)),
            mapTo(true),
            catchError(error => {
                return of(false);
            }));
    }
    doLoginUser(response) {
        const token = response.body.token;
        localStorage.setItem(this.TOKEN, token);
    }
    logout() {
        localStorage.removeItem(this.TOKEN);
    }
    getToken() {
        return localStorage.getItem(this.TOKEN);
    }
    isLoggedIn() {
        return !!this.getToken();
    }
}
