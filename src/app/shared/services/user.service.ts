import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { HandlerService } from './handler.service';
import { User } from './../models/user.model';
import { SERVER_URL } from './../constant';
import { httpOptions } from './../helper/http-headers';
import { RoleType } from '../models/role.model';

export const INIT_USER = {
  _id: undefined,
  role: {
    _id: '',
    role_name: '',
    role_type: RoleType.Employee,
    is_deleted: false
  },
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  birth_date: '',
  join_date: '',
  is_deleted: false,
  is_active: false,
  image: '',
};

export const INIT_ARRAY_USERS: Array<User> = [ INIT_USER ];
export const INIT_ID_NUMBER: string = undefined;

@Injectable()
export class UserService {

    private allUser: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(INIT_ARRAY_USERS);
    private user: BehaviorSubject<User> = new BehaviorSubject<User>(INIT_USER);
    private userID: BehaviorSubject<string> = new BehaviorSubject<string>(INIT_ID_NUMBER);
    private isDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private showStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    allUserData$: Observable<User[]> = this.allUser.asObservable();
    userData$: Observable<User> = this.user.asObservable();
    userID$: Observable<string> = this.userID.asObservable();
    isDeleteData$: Observable<boolean> = this.isDelete.asObservable();
    isLoadingData$: Observable<boolean> = this.isLoading.asObservable();
    isShowAll$: Observable<boolean> = this.showStatus.asObservable();

    constructor(
      private http: HttpClient,
      private handlerService: HandlerService,
      private loadingService: LoadingService
    ) { }

    setQueryParams(params): Object {
      return {
        params: new HttpParams()
          .set('page', params.page ? params.page : '1')
          .set('limit', params.limit ? params.limit : '10')
          .set('keyword', params.keyword ? params.keyword : '')
          .set('active', params.active ? params.active : '')
          .set('roles', params.roles ? JSON.stringify(params.roles) : '' )
          .set('birthday', params.birthday || params.birthday === 0 ? params.birthday : ''),
        headers: httpOptions.headers
      };
    }

    getUserList(params): Observable<any> {

      const url = `${SERVER_URL}/users`;
      const queryParams = this.setQueryParams(params);
      this.loadingService.changeStatusLoading(true);

      return this.http.get<any>(url, queryParams).pipe(
        tap((res) => {
          this.allUser.next(res.data);
        }),
        catchError(this.handlerService.handleError<any>('get user list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    addUser(user: User): Observable<User> {
      const url = `${SERVER_URL}/users`;
      const data = {
        role: user.role._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birth_date: user.birth_date,
        join_date: user.join_date,
        password: user.password,
        is_active: user.is_active ? user.is_active : true,
        image: user.image
      };

      this.loadingService.changeStatusLoading(true);

      return this.http.post<User>(url, data, httpOptions).pipe(
        tap((res) => {
          this.user.next(res);
        }),
        catchError(this.handlerService.handleError<any>('add a new user to list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    updateUser(userId: string, user: User): Observable<User> {

      const url = `${SERVER_URL}/users/${userId}`;
      const data = {
        role: user.role._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birth_date: user.birth_date,
        join_date: user.join_date,
        is_active: user.is_active,
        image: user.image
      };

      this.loadingService.changeStatusLoading(true);

      return this.http.put<User>(url, data, httpOptions).pipe(
        tap((res) => {
          this.user.next(res);
        }),
        catchError(this.handlerService.handleError<any>('update user')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    deleteUser(userId: string): Observable<User> {

      const url = `${SERVER_URL}/users/${userId}`;

      this.loadingService.changeStatusLoading(true);

      return this.http.delete<User>(url, httpOptions).pipe(
        tap((res) => {
          this.user.next(res);
        }),
        catchError(this.handlerService.handleError<any>('delete user')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    updateID(userId: string): void {
      this.userID.next(userId);
    }

    updateUserData(user: User): void {
      this.user.next(user);
    }

    checkIsDelete(isDelete: boolean): void {
      this.isDelete.next(isDelete);
    }
}

