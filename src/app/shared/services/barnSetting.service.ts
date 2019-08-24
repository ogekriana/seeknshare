// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HandlerService } from './handler.service';
// import { catchError, tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// import { SERVER_URL } from '../constant';
// import { BarnSetting, BarnSettingExtention } from '../models/barnsetting.model';

// @Injectable({
//     providedIn: 'root'
// })
// export class BarnSettingService {

//     private api_url = SERVER_URL;
//     constructor(
//         private http: HttpClient,
//         private handlerService: HandlerService
//     ) { }

//     getList(id_barn: string, page = 0, limit = 10) {
//         const url = `${this.api_url}/barn-setting?id_barn=${id_barn}`;
//         return this.http.get<BarnSettingExtention[]>(url).pipe(
//             tap((res) => { }),
//             catchError(this.handlerService.handleError<any>('get barn-setting list'))
//         );
//     }

//     update(data: BarnSetting) {
//         const url = `${this.api_url}/barn-setting/${data._id}`;
//         return this.http.patch<BarnSetting>(url, data).pipe(
//             tap((res) => { }),
//             catchError(this.handlerService.handleError<any>('update barn-setting'))
//         );
//     }

//     insertOrUpdateMany(data: BarnSetting[]): Observable<BarnSetting[]> {
//         const url = `${this.api_url}/barn-setting/insertorupdate-many`;
//         return this.http.post<BarnSetting[]>(url, data).pipe(
//             tap((res) => { }),
//             catchError(this.handlerService.handleError<any>('insert or update many barn-setting'))
//         );
//     }

//     delete(data: BarnSetting) {
//         const url = `${this.api_url}/barn-setting/${data._id}`;
//         return this.http.delete<BarnSetting>(url).pipe(
//             tap((res) => { }),
//             catchError(this.handlerService.handleError<any>('delete barn-setting'))
//         );
//     }
// }
