import { MatDialogRef } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements AfterViewInit {

  loadingStatus$: Observable<Boolean> = this.loadingService.loadingStatus$;

  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit() {
    this.loadingStatus$
      .pipe(delay(0))
      .subscribe(isLoading => {
        if (!isLoading) {
          this.dialogRef.close();
        }
      });
  }
}
