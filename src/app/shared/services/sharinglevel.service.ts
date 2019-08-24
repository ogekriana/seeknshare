// import { Injectable } from '@angular/core';
// import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

// import { Observable, BehaviorSubject } from 'rxjs';
// import { catchError, tap, finalize } from 'rxjs/operators';

// import { SharingLevel } from './../models/sharinglevel.model';
// import { HandlerService } from './handler.service';
// import { SERVER_URL } from './../constant';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };
// export const INIT_ARRAY_SHARING_LEVEL: Array<any> = [
//   {
//     _id: undefined,
//     sharing_level: '',
//     grade: '',
//     is_deleted: false
//   }
// ];
// export const INIT_SHARING_LEVEL = {
//   _id: undefined,
//   sharing_level: '',
//   grade: '',
//   is_deleted: false
// };
// export const INIT_ID_NUMBER: string = undefined;

// @Injectable({
//   providedIn: 'root'
// })
// export class SharingLevelService {

//   private allSharingLevel: BehaviorSubject<SharingLevel[]> = new BehaviorSubject<SharingLevel[]>(INIT_ARRAY_SHARING_LEVEL);
//   private sharingLevel: BehaviorSubject<SharingLevel> = new BehaviorSubject<SharingLevel>(INIT_SHARING_LEVEL);
//   private sharingLevelID: BehaviorSubject<string> = new BehaviorSubject<string>(INIT_ID_NUMBER);
//   private isDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   private showStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   allSharingLevelData$: Observable<SharingLevel[]> = this.allSharingLevel.asObservable();
//   sharingLevelData$: Observable<SharingLevel> = this.sharingLevel.asObservable();
//   sharingLevelID$: Observable<string> = this.sharingLevelID.asObservable();
//   isDeleteData$: Observable<boolean> = this.isDelete.asObservable();
//   isLoadingData$: Observable<boolean> = this.isLoading.asObservable();
//   isShowAll$: Observable<boolean> = this.showStatus.asObservable();

//   constructor(
//     private http: HttpClient,
//     private handlerService: HandlerService
//   ) {}

//   getSharingLevelList(page: string = '1', filter: string = '',
//     sort: string = 'desc',
//     perPage: string = '10',
//     status: string = 'active'): Observable<SharingLevel[]> {

//     const url = `${SERVER_URL}/sharing-level`;

//     this.isLoading.next(true);

//     const queryParams = {
//       params: new HttpParams()
//         .set('page', page)
//         .set('perPage', perPage)
//         .set('sort', sort)
//         .set('filter', filter)
//         .set('status', status),
//       headers: httpOptions.headers
//     };

//     return this.http.get<any>(url, queryParams)
//       .pipe(
//         tap((res) => {
//           this.allSharingLevel.next(res.data);
//         }),
//         catchError(this.handlerService.handleError<any>('Get SharingLevel list')),
//         finalize(() => this.isLoading.next(false))
//       );
//   }

//   create(sharingLevel: SharingLevel): Observable<SharingLevel> {
//     const url = `${SERVER_URL}/sharing-level`;

//     this.isLoading.next(true);

//     return this.http.post<SharingLevel>(url, sharingLevel, httpOptions)
//       .pipe(
//         tap((res) => {
//           this.sharingLevel.next(res);
//         }),
//         catchError(this.handlerService.handleError<any>('add a new sharing level to list')),
//         finalize(() => this.isLoading.next(false))
//       );
//   }

//   update(sharingLevelId: string, sharingLevel: SharingLevel): Observable<SharingLevel> {
//     const url = `${SERVER_URL}/sharing-level/${sharingLevelId}`;

//     this.isLoading.next(true);

//     return this.http.put<SharingLevel>(url, sharingLevel, httpOptions)
//       .pipe(
//         tap((res) => {
//           this.sharingLevel.next(res);
//         }),
//         catchError(this.handlerService.handleError<any>('update sharing level data')),
//         finalize(() => this.isLoading.next(false))
//       );
//   }

//   deactive(sharingLevelId: string): Observable<SharingLevel> {
//     const url = `${SERVER_URL}/sharing-level/${sharingLevelId}`;

//     this.isLoading.next(true);

//     const queryParams = {
//       params: new HttpParams()
//         .set('action', 'deactive'),
//       headers: httpOptions.headers
//     };

//     return this.http.delete<SharingLevel>(url, queryParams)
//       .pipe(
//         tap((res) => {
//           this.sharingLevel.next(res);
//         }),
//         catchError(this.handlerService.handleError<any>('deactive sharing level')),
//         finalize(() => this.isLoading.next(false))
//       );
//   }

//   delete(sharingLevelId: string): Observable<SharingLevel> {
//     const url = `${SERVER_URL}/sharing-level/${sharingLevelId}`;

//     this.isLoading.next(true);

//     const queryParams = {
//       params: new HttpParams()
//         .set('action', 'delete'),
//       headers: httpOptions.headers
//     };

//     return this.http.delete<SharingLevel>(url, queryParams)
//       .pipe(
//         tap((res) => {
//           this.sharingLevel.next(res);
//         }),
//         catchError(this.handlerService.handleError<any>('delete sharing level')),
//         finalize(() => this.isLoading.next(false))
//       );
//   }

//   updateID(sharingLevelId: string): void {
//     return this.sharingLevelID.next(sharingLevelId);
//   }

//   updateSharingLevel(sharingLevel: SharingLevel): void {
//     return this.sharingLevel.next(sharingLevel);
//   }

//   checkIsDelete(isDelete: boolean): void {
//     return this.isDelete.next(isDelete);
//   }

//   checkShowStatus(isShow: boolean): void {
//     return this.showStatus.next(isShow);
//   }
// }

