import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandlerService } from './handler.service';
import { catchError, tap, map, finalize } from 'rxjs/operators';

import { SERVER_URL } from '../constant';
import { User } from '../models/user.model';
import { UserGroup } from '../models/usergroup.model';
import { LoadingService } from './loading.service';

@Injectable()
export class UserGroupService {

    private api_url = `${SERVER_URL}/user-group`;

    constructor(
      private http: HttpClient,
      private handlerService: HandlerService,
      private loadingService: LoadingService
    ) { }

    getGroupMember(manager: User) {
        const url = `${this.api_url}/${manager._id}`;

        this.loadingService.changeStatusLoading(true);
        return this.http.get<UserGroup[]>(url).pipe(
            tap((res) => { }),
            catchError(this.handlerService.handleError<any>('get group member')),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }

    getCountGroupMember(manager: User) {
      const url = `${this.api_url}/${manager._id}`;

      this.loadingService.changeStatusLoading(true);
      return this.http.get<UserGroup[]>(url).pipe(
          map((res) => {
            return res.length;
          }),
          catchError(this.handlerService.handleError<any>('get group member')),
          finalize(() => {
            this.loadingService.changeStatusLoading(false);
          })
      );
    }

    addUserAsMember(manager: User, user: User) {

        const param = { user };
        const url = `${this.api_url}/${manager._id}`;

        this.loadingService.changeStatusLoading(true);
        return this.http.post<UserGroup>(url, param).pipe(
            tap((res) => { }),
            catchError(this.handlerService.handleError<any>('add group member')),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }

    deleteMemberGroup(data: UserGroup) {
        const url = `${this.api_url}/${data._id}`;

        this.loadingService.changeStatusLoading(true);
        return this.http.delete(url).pipe(
            tap((res) => { }),
            catchError(this.handlerService.handleError<any>('delete group member')),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }
}
