import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable()
export class SchoolTypesResolver implements Resolve<any> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('SchoolTypesResolver # resolve: getSchools');
    return this.userService.getSchools().map(
      data => data['body']
    );

  }
}
