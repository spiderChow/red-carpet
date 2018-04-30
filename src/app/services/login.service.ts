import { Injectable } from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {escape} from 'querystring';

@Injectable()
export class LoginService {
  isLoggedIn = false;

  loginUserId;



  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(userId) {

    const user = {
      id: userId,
      password: '',
      roles: 'ROLE_USER'
    };
    this.loginUserId = userId;
    console.log(user);
    this.isLoggedIn = true;
    return this.http.post('/hongtan/vote/api/admin/users/user/' , user);
    // return this.http.post('/hongtan/vote/api/admin/users/', user);
    // return of(true).pipe(
    //   delay(1000),
    //   tap(val => this.isLoggedIn = true)
    // );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  signUp() {

  }

}
