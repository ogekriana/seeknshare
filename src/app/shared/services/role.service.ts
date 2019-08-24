import { SERVER_URL } from './../constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { HandlerService } from './handler.service';
import { Role, RoleType } from './../models/role.model';
import { httpOptions } from './../helper/http-headers';
import { LoadingService } from './loading.service';

export const INIT_ROLE = {
  _id: undefined,
  role_name: '',
  role_type: RoleType.Employee,
  is_deleted: false
};

export const INIT_ARRAY_ROLES: Array<Role> = [ INIT_ROLE ];
export const INIT_ID_NUMBER: string = undefined;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    private allRole: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>(INIT_ARRAY_ROLES);
    private role: BehaviorSubject<Role> = new BehaviorSubject<Role>(INIT_ROLE);
    private roleID: BehaviorSubject<string> = new BehaviorSubject<string>(INIT_ID_NUMBER);
    private allRoleType: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
    private isDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private showStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    allRoleData$: Observable<Role[]> = this.allRole.asObservable();
    roleData$: Observable<Role> = this.role.asObservable();
    roleID$: Observable<string> = this.roleID.asObservable();
    allRoleTypeList$: Observable<Array<string>> = this.allRoleType.asObservable();
    isDeleteData$: Observable<boolean> = this.isDelete.asObservable();
    isLoadingData$: Observable<boolean> = this.isLoading.asObservable();
    isShowAll$: Observable<boolean> = this.showStatus.asObservable();

    constructor(
      private http: HttpClient,
      private handlerService: HandlerService,
      private loadingService: LoadingService
    ) { }

    getRoleList(): Observable<any> {

      const url = `${SERVER_URL}/roles`;

      this.loadingService.changeStatusLoading(true);

      return this.http.get<Role[]>(url, httpOptions).pipe(
        tap((res) => {

          this.allRole.next(res);
        }),
        catchError(this.handlerService.handleError<any>('get role list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    getRoleType(): Observable<Array<string>> {
      const url = `${SERVER_URL}/roles/role-type`;

      this.loadingService.changeStatusLoading(true);

      return this.http.get<Array<string>>(url, httpOptions)
        .pipe(
          tap((res) => {
            this.allRoleType.next(res);
          }),
          catchError(this.handlerService.handleError<any>('get role type list')),
          finalize(() => {
            this.loadingService.changeStatusLoading(false);
          })
        );
    }

    addRole(role: Role): Observable<Role> {
      const url = `${SERVER_URL}/roles`;
      const data = role;

      this.loadingService.changeStatusLoading(true);

      return this.http.post<Role>(url, data, httpOptions).pipe(
        tap((res) => {
          this.role.next(res);
        }),
        catchError(this.handlerService.handleError<any>('add role to list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    updateRole(roleId: string, role: Role): Observable<Role> {
      const url = `${SERVER_URL}/roles/${roleId}`;
      const data = role;

      this.loadingService.changeStatusLoading(true);

      return this.http.put<Role>(url, data, httpOptions).pipe(
        tap((res) => {
          this.role.next(res);
        }),
        catchError(this.handlerService.handleError<any>('update role')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    deleteRole(roleId: string): Observable<Role> {
      const url = `${SERVER_URL}/roles/${roleId}`;

      this.loadingService.changeStatusLoading(true);

      return this.http.delete<Role>(url, httpOptions).pipe(
        tap((res) => {
          this.role.next(res);
        }),
        catchError(this.handlerService.handleError<any>('delete role')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    updateID(roleId: string): void {
      this.roleID.next(roleId);
    }

    updateRoleData(role: Role): void {
      this.role.next(role);
    }
}

