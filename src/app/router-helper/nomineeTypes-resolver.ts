import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable()
export class NomineeTypesResolver implements Resolve<any> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('NomineeTypesResolver # resolve: getTypes');
    return this.userService.getTypes().map(
      data => data['body']
    );

  }
}
