import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from '../homepage/login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginService, public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.getToken()) {
      request = this.addToken(request, this.loginService.getToken());
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      }),
    );
  }

  addToken(request, token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    return request;
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.loginService.logout();
    this.router.navigate(['']);
    return next.handle(request);
  }
}
