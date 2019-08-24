import { Observable } from 'rxjs';
import { BarnService } from 'src/app/shared/services/barn.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class BarnActiveResolver implements Resolve<any> {

  constructor(private barnService: BarnService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<any> | Promise<any> | any {
    return this.barnService.getList().subscribe((res) => {
      /* Add filter to get last active barn */
      if (res.data) {
        const barnFilter = res.data
          .filter((list) => {
            return list.is_active === true && list.release_date !== null;
          });
        this.barnService.updateBarnActive(barnFilter[barnFilter.length - 1]);
      }
    });
  }
}
