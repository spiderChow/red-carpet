import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Nominee} from '../models/nominee.model';
import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';

@Injectable()

export class ModifyGuardService implements CanActivate, CanActivateChild {


  constructor(private loginService: LoginService,
              private  userService: UserService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loginService.isLoggedIn) {
      alert('请先登录');
      return false;
    }
    console.log('ModifyGuardService # CanActivate called');
    // const nominationId = route.params['id'];
    // if (nominationId) {


    // return this.loginService.getReferee(this.userService.modifyNominee.id).map(response => {
    //   console.log(response);
    //   let val = false;
    //   if (response['body']['refereeId'] === this.loginService.loginUserId) {
    //     // Consume data here
    //     val = true;
    //
    //   } else {
    //     alert('不能乱改别人的提名嘛');
    //   }
    //   return val;
    // });


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }

}
