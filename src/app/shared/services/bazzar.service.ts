import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandlerService } from './handler.service';
import { catchError, map, tap, finalize } from 'rxjs/operators';

import { SERVER_URL } from '../constant';
import { Bazzar } from '../models/bazzar.model';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
export const INIT_ARRAY_BAZZAR: Array<Bazzar> = [];
@Injectable({
    providedIn: 'root'
})
export class BazzarService {

  private api_url = SERVER_URL;

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService,
    private activatedRoute: Router,
    private loadingService: LoadingService
  ) { }

  getList(page = 0, limit = 10) {
    const url = `${this.api_url}/bazzarsItem`;

    this.loadingService.changeStatusLoading(true);

    return this.http.get<any[]>(url)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  getSingleList(item) {
    const url = `${this.api_url}/bazzarsItem/${item}`;
    this.loadingService.changeStatusLoading(true);
    return this.http.get<any[]>(url)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  deleteBazzarItem(item) {

    const url = `${this.api_url}/bazzarsItem/${item}`;
    this.loadingService.changeStatusLoading(true);

    return this.http.delete<any[]>(url).pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
    );
  }

  submitData(data) {

    const url = `${this.api_url}/bazzarsItem`;
    this.loadingService.changeStatusLoading(true);

    return this.http.post<any[]>(url, data)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  submitBazzar(data) {

    const url = `${this.api_url}/bazzars`;
    this.loadingService.changeStatusLoading(true);

    return this.http.post<any[]>(url, data)
      .pipe(
        tap((res) => { }),
        catchError(() => this.activatedRoute.navigateByUrl('/merchant')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  getBazzar() {

    const url = `${this.api_url}/bazzars`;
    this.loadingService.changeStatusLoading(true);

    return this.http.get<any[]>(url)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  getSingleBazzar(id) {

    const url = `${this.api_url}/bazzars/${id}`;
    this.loadingService.changeStatusLoading(true);

    return this.http.get<any[]>(url)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  updateBazzarList(data, id) {

    const url = `${this.api_url}/bazzarsItem/${id}`;
    this.loadingService.changeStatusLoading(true);

    return this.http.put<any[]>(url, data)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }

  updateBazzar(data, id) {

    const url = `${this.api_url}/bazzars/${id}`;
    this.loadingService.changeStatusLoading(true);

    return this.http.put<any[]>(url, data)
      .pipe(
        tap((res) => { }),
        catchError(this.handlerService.handleError<any>('get bazzar list')),
        finalize(() => {
          this.loadingService.changeStatusLoading(false);
        })
      );
  }
}
