import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { SERVER_URL } from '../constant';
import { Barn } from '../models/barn.model';
import { RoleType } from './../models/role.model';
import { INIT_USER } from './user.service';
import { httpOptions } from './../helper/http-headers';
import { HandlerService } from './handler.service';
import { LoadingService } from './loading.service';

export const INIT_BARN: Barn = {
  _id: undefined,
  name: '',
  start_period: new Date,
  end_period: new Date(),
  release_date: new Date(),
  owner: INIT_USER,
  carrot_per_employee: 0,
  total_carrot: 0,
  is_deleted: false,
  is_active: false,
  excluded: []
};

const INIT_ARRAY_BARN: Array<Barn> = [INIT_BARN];

@Injectable({
    providedIn: 'root'
})
export class BarnService {

    private barnList: BehaviorSubject<Barn[]> = new BehaviorSubject<Barn[]>(INIT_ARRAY_BARN);
    private barn: BehaviorSubject<Barn> = new BehaviorSubject<Barn>(INIT_BARN);
    private barnID: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    barnList$: Observable<Barn[]> = this.barnList.asObservable();
    barn$: Observable<Barn> = this.barn.asObservable();
    barnID$: Observable<string> = this.barnID.asObservable();

    constructor(
        private http: HttpClient,
        private handlerService: HandlerService,
        private loadingService: LoadingService
    ) { }

    getList(page = 0, limit = 10): Observable<any> {

        const url = `${SERVER_URL}/barns`;

        this.loadingService.changeStatusLoading(true);

        return this.http.get<Barn[]>(url).pipe(
            tap((res) => {
              this.barnList.next(res);
            }),
            catchError(this.handlerService.handleError<any>('get barn list')),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }

    getSingle(id: string): Observable<any> {

        const url = `${SERVER_URL}/barns/${id}`;

        this.loadingService.changeStatusLoading(true);

        return this.http.get<Barn>(url).pipe(
            tap((res) => {
              this.barn.next(res);
            }),
            catchError(this.handlerService.handleError<any>('get single barn')),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }

    create(data: Barn): Observable<any> {

        const url = `${SERVER_URL}/barns`;

        this.loadingService.changeStatusLoading(true);

        return this.http.post<any>(url, data).pipe(
            tap(
              (res) => {
                // console.log('tap response create: ', res.message);
              },
              (err) => {
                // console.log('tap response error create: ', err.error.message);
              }
            ),
            catchError(err => of(err)),
            finalize(() => {
              this.loadingService.changeStatusLoading(false);
            })
        );
    }

    update(data: Barn): Observable<any> {

      const url = `${SERVER_URL}/barns/${data._id}`;

      this.loadingService.changeStatusLoading(true);

      return this.http.patch<Barn>(url, data).pipe(
        tap(
          (res) => {
            // console.log('tap response create: ', res.message);
          },
          (err) => {
            // console.log('tap response error create: ', err.error.message);
          }
        ),
        catchError(err => of(err)),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }

    getTotalEmployee(): Observable<any> {

      const url = `${SERVER_URL}/users/count`;
      const queryParams = {
        params: new HttpParams()
          .set('roles', RoleType.Employee),
        headers: httpOptions.headers
      };

      this.loadingService.changeStatusLoading(true);

      return this.http.get<any>(url, queryParams).pipe(
          tap((res) => { }),
          catchError(this.handlerService.handleError<any>('get total employee')),
          finalize(() => {
            this.loadingService.changeStatusLoading(false);
          })
      );
    }

    updateBarnID(barnID: string): void {
      this.barnID.next(barnID);
    }

    updateBarnActive(barnActive: Barn): void {
      this.barn.next(barnActive);
    }
}
