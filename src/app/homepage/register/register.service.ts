import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { default as urlData } from 'src/app/core/config';
import { IRegisterData } from '../../core/interfaces/user.interfaces';

@Injectable()
export class RegisterService {
  registerUrl = urlData.host + 'users/register/';

  constructor(private http: HttpClient) {}

  registerUser(data: IRegisterData): Observable<any> {
    return this.http.post(this.registerUrl, data).pipe(first());
  }
}
