// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { SharingType } from './../models/sharingtype.model';
// import { HandlerService } from './handler.service';
// import { httpOptions } from './../helper/http-headers';
// import { SERVER_URL } from '../constant';

// @Injectable()
// export class SharingTypeService {
  // private api_url = SERVER_URL;

//   constructor(
//     private http: HttpClient,
//     private handlerService: HandlerService
//   ) {}

//   getSharingTypeList(): Observable<any> {
//     const url = `${this.api_url}/sharing-type`;

//     return this.http.get<SharingType[]>(url, httpOptions)
//       .pipe(
//         tap(res => { }),
//         catchError(this.handlerService.handleError<any>('Get SharingType list'))
//       );
//   }

//   create(sharingType: SharingType): Observable<SharingType> {
//     const url = `${this.api_url}/sharing-type`;

//     return this.http.post<SharingType>(url, sharingType, httpOptions)
//       .pipe(
//         tap((res) => { }),
//         catchError(this.handlerService.handleError<any>('add a new sharing type to list'))
//       );
//   }

//   update(sharingTypeId: string, sharingType: SharingType): Observable<SharingType> {
//     const url = `${this.api_url}/sharing-type/${sharingTypeId}`;

//     return this.http.patch<SharingType>(url, sharingType, httpOptions)
//       .pipe(
//         tap((res) => { }),
//         catchError(this.handlerService.handleError<any>('update sharing type data'))
//       );
//   }

//   delete(sharingTypeId: string): Observable<SharingType> {
//     const url = `${this.api_url}/sharing-type/${sharingTypeId}`;

//     return this.http.delete<SharingType>(url, httpOptions)
//       .pipe(
//         tap((res) => { }),
//         catchError(this.handlerService.handleError<any>('delete sharing type'))
//       );
//   }
// }
