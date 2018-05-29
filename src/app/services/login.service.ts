import {Injectable} from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {escape} from 'querystring';

@Injectable()
export class LoginService {
  isLoggedIn = false;

  context = '/pickup';
  EXIT_USER = '/hongtan/vote/api/admin/users/user/';
  GT_INIT = '/hongtan/vote/gt/start';
  GT_SEOND = '/hongtan/vote/gt/verify';

  constructor(private http: HttpClient) {
  }

  // const user = {
  //   id: userId,
  //   password: '',
  //   roles: 'ROLE_USER'
  // };
  // this.loginUserId = userId;
  // console.log(user);
  // this.isLoggedIn = true;
  // // clientId: 1b135b2c-21ec-40ff-8848-f46233c644a1
  // // clientSecret: 7C><yZ7<opAY
  // //   accessTokenUri: https://tac.fudan.edu.cn/oauth2/token.act
  // //   userAuthorizationUri: https://tac.fudan.edu.cn/oauth2/authorize.act
  // //     tokenName: oauth_token
  // // authenticationScheme: query
  // // clientAuthenticationScheme: form
  // // resource:
  // //   userInfoUri: https://tac.fudan.edu.cn/resource/userinfo.act
  //
  // // https://tac.fudan.edu.cn/oauth2/authorize.act?client_id=1b135b2c-21ec-40ff-8848-f46233c644a1
  // &response_type=code&state=1234&redirect_uri=http://yst.fudan.edu.cn/oauth
  // const authorize_api = 'https://tac.fudan.edu.cn/oauth2/authorize.act';
  // const authorize_params = {
  //   'client_id': '1b135b2c-21ec-40ff-8848-f46233c644a1',
  //   'response_type': 'code',
  //   'state': '123321',
  //   'redirect_uri': 'http://yst.fudan.edu.cn/oauth'
  // };
  // // return this.http.get(authorize_api, {
  // //   params: authorize_params,
  // //   observe: 'response'
  // // }).subscribe(data => console.log(data));
  //
  // return this.http.post('/hongtan/vote/api/admin/users/user/' , user);

  admin(userId: string) {
    return this.http.post(this.context + this.EXIT_USER,
      {'id': userId}
    );
  }

  gtInit() {
    return this.http.get(this.context + this.GT_INIT);
  }

  gtSecond(obj) {
    return this.http.post(this.context + this.GT_SEOND, obj);
  }


}
