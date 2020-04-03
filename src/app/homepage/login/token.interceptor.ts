import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public loginService: LoginService, public router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.loginService.getToken()) {
            request = this.addToken(request, this.loginService.getToken());
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else if (error.status !== 406) {
                this.handleError(request, next);
                return throwError(error);
            }
            else {
                return throwError(error);
            }
        }));
    }

    addToken(request, token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
        return request;
    }
    handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        this.loginService.logout();
        this.router.navigate(['']);
        return next.handle(request);
    }
    handleError(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request);
    }
}