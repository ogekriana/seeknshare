import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.userService.getUserList({}).subscribe((res) => {});
    }
}
