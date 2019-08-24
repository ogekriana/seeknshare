import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { INIT_USER } from './user.service';

import { SERVER_URL } from '../constant';
import { httpOptions } from './../helper/http-headers';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userID: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(INIT_USER);

  user$: Observable<User> = this.user.asObservable();
  userID$: Observable<string> = this.userID.asObservable();

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private loadingService: LoadingService
  ) { }

  login(username: string, password: string): Observable<any> {
    const url = `${SERVER_URL}/auth/login`;
    const cred = { username, password };

    this.loadingService.changeStatusLoading(true);

    return this.http.post<any>(url, cred, httpOptions)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          const user = {
            username: res.user.username,
            role: res.user.role.role_type
          };
          const encodedUser = btoa(JSON.stringify(user));
          localStorage.setItem('user', encodedUser);
        }),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return of(true);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  currentUser() {
    const user = JSON.parse(atob(localStorage.getItem('user')));
    return user;
  }

  getProfile() {
    const url = `${SERVER_URL}/auth/myprofile`;

    this.loadingService.changeStatusLoading(true);

    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap((res) => {
          this.user.next(res);
          this.userID.next(res._id);
        }),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }
}
