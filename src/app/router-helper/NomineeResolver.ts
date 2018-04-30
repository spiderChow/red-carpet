import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Nominee} from '../models/nominee.model';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class NomineeResolver implements Resolve<any> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('Get my todo list.');
    return this.userService.getPassedNomineeList().map(
      data => data['body']
    );

  }
}
