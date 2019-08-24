import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export const isLoading: Boolean = false;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStatus: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(isLoading);

  loadingStatus$: Observable<Boolean> = this.loadingStatus.asObservable();

  changeStatusLoading(status: Boolean) {
    this.loadingStatus.next(status);
  }
}
