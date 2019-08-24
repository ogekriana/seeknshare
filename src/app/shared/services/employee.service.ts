import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { Barn } from '../models/barn.model';
import { User } from '../models/user.model';
import { SERVER_URL } from '../constant';
import { httpOptions } from '../helper/http-headers';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';

@Injectable()
export class EmployeeService {

  private carrotLeft: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  carrotLeft$: Observable<number> = this.carrotLeft.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getEmployeeHistoryCarrot(user: User, barn: Barn, type: string): Observable<any> {

    const url = `${SERVER_URL}/carrot-history/byuser`;

    /* Add params barn consist of barn id and user consist of user id */
    const queryParams: Object = {
      params: new HttpParams()
        .set('user', user._id)
        .set('barn', barn._id)
        .set('type', type),
      headers: httpOptions.headers
    };

    this.loadingService.changeStatusLoading(true);

    return this.http.get<any>(url, queryParams)
      .pipe(
        tap((res) => { 
          this.carrotLeft.next(Math.abs(res.carrot_left))
        }),
        catchError((err) => of(err)),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  updateCarrotLeft(carrot: number) {
    this.carrotLeft.next(carrot)
  }
}
