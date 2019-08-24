import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DialogService } from './../shared/services/dialog.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private dialogService: DialogService) {}
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
              setHeaders: { 'x-access-token': `${token}` }
            });
        }
        return next.handle(req)
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {

                // let errorMessage = '';
                // if (error.error instanceof ErrorEvent) {
                //   // client-side error
                //   errorMessage = `Error: ${error.error.message}`;
                // } else {
                //   // server-side error
                //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                // }

                this.dialogService.error('Invalid Credentials');
                return throwError(error);
            })
          );
    }

}
