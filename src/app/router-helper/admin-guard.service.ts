import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Nominee} from '../models/nominee.model';
import {DashboardService} from '../services/dashboard.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private dashboardService: DashboardService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AdminGuard # canActivate called');
    if (!this.dashboardService.isAdminPassed) {
      alert('管理员请先登陆');
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
