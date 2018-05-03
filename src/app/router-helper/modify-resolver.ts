import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Nominee} from '../models/nominee.model';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ModifyResolver implements Resolve<any> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nominee> {
    console.log('ModifyResolver # resolve: getNomineeById');
    return this.userService.getNomineeById(this.userService.modifyNominee).map(
      data => data['body']
    );

  }
}
