import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.root.firstChild.params['id']) {
      let nominationId = state.root.firstChild.params['id'];
      this.loginService.getReferee(nominationId).subscribe(data => {
          console.log(data['body']);
          // 多个guard 会怎么样？
        }

      );
    } else {
      console.log('UserGuard # CanActivate called');
      const url: string = state.url;

      return this.checkLogin(url);
    }

  }

  canActivateChild() {
    console.log('in canActivateChild');

    return false;
  }


  checkLogin(url: string): boolean {
    console.log('UserGuard # checkLogin called');
    console.log(this.loginService.isLoggedIn);

    if (this.loginService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
