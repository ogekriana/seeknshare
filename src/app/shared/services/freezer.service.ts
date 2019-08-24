import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { SERVER_URL } from '../constant';
import { httpOptions } from './../helper/http-headers';
import { HandlerService } from './handler.service';
import { LoadingService } from './loading.service';

@Injectable()
export class FreezerService {

  private carrotLeft: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  carrotLeft$: Observable<number> = this.carrotLeft.asObservable();

  constructor(
      private http: HttpClient,
      private handlerService: HandlerService,
      private loadingService: LoadingService
  ) { }

  getRewardHistory(barn_id: string, manager_id: string): Observable<any> {
    const url = `${SERVER_URL}/carrot-history/byuser`;
    const queryParams: Object = {
      params: new HttpParams()
        .set('barn', barn_id)
        .set('user', manager_id),
      headers: httpOptions.headers
    };

    this.loadingService.changeStatusLoading(true);

    return this.http.get<any>(url, queryParams).pipe(
        tap((res) => {
          this.carrotLeft.next(Math.abs(res.carrot_left));
        }),
        catchError(this.handlerService.handleError<any>('get reward history')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
    );
  }

  updateCarrotLeft(carrot: number) {
    this.carrotLeft.next(carrot);
  }
}
