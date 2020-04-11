import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { default as configData } from '../../core/config';
import { ILoginData } from '../../core/interfaces/user.interfaces';

@Injectable()
export class LoginService {
  private loginUrl: string;
  private readonly TOKEN: string;

  constructor(private http: HttpClient) {
    this.loginUrl = configData.host + 'users/login/';
    this.TOKEN = 'Token';
  }

  login(data: ILoginData): Observable<HttpResponse<any>>  {
    return this.http.post(this.loginUrl, data).pipe(
      tap((response: any) => {
        this.doLoginUser(response.token);
      }),
    );
  }

  doLoginUser(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
