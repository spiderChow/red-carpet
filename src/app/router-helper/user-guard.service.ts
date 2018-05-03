import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Nominee} from '../models/nominee.model';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('UserGuard # canActivate called');
    if (!this.loginService.isLoggedIn) {
      alert('请先登录');
      return false;
    } else {
      return true;
    }

  }

  canActivateChild() {
    console.log('in canActivateChild');

    return false;
  }

}
