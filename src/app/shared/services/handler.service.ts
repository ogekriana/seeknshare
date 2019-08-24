import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  constructor() { }
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result);
    };
  }
}
