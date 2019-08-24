import { CarrotHistory } from './../models/carrothistory.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { HandlerService } from './handler.service';
import { SERVER_URL } from './../constant';
import { httpOptions } from './../helper/http-headers';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CarrotHistoryService {

  private api_url = SERVER_URL;
  constructor(
    private http: HttpClient,
    private handlerService: HandlerService,
    private loadingService: LoadingService
  ) { }

  create(data: CarrotHistory): Observable<CarrotHistory> {
    const url = `${this.api_url}/carrot-history`;

    this.loadingService.changeStatusLoading(true);

    return this.http.post<CarrotHistory>(url, data).pipe(
      tap((res) => { }),
      catchError(this.handlerService.handleError<any>('add carrot history to list')),
      finalize(() => {
        this.loadingService.changeStatusLoading(false);
      })
    );
  }

  setQueryParams( page: string = '1',
                    limit: string = '10',
                    filter: string = '',
                    active: string = '',
                    data: CarrotHistory,
                    from: string,
                    to: string,
                  ): object {
      return {
        params: new HttpParams()
          .set('page', page)
          .set('limit', limit)
          .set('keyword', filter)
          .set('active', active)
          .set('barn', data.barn),
        headers: httpOptions.headers,
        body : {
          'owner' : data.owner,
          'barn' : data.barn,
          'destination' : data.destination,
          'type' : data.type,
          'description' : data.description,
          'fromdate' : from,
          'todate' : to
        }
      };
    }

  getbyFilter(
    data: CarrotHistory,
    page: string = '1',
    limit: string = '10',
    filter: string = '',
    active: string = '',
    from: string,
    to: string
  ): Observable<any> {

    const url = `${this.api_url}/carrot-history/byfilter`;
    const queryParams = this.setQueryParams(page, limit, filter, active, data, from, to);

    this.loadingService.changeStatusLoading(true);

    return this.http.get<CarrotHistory>(url, queryParams)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('add carrot history to list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
    }
}
