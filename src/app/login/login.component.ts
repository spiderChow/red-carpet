import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import {Form, NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  @ViewChild('f') f: NgForm;

  constructor(public loginService: LoginService, public router: Router) {
  }


  login() {
    this.message = 'Trying to log in ...';

    const userId = (<HTMLInputElement>document.getElementById('username')).value ;
    // const password = (<HTMLInputElement>document.getElementById('password')).value ; // TODO: how to hash the password?




    this.loginService.login(userId).subscribe(
      data => {
        console.log(data['body']);
        this.router.navigate(['nominate']);
        this.loginService.isLoggedIn = data['body'];

      }
    );
    // this.loginService.login(userId, password).subscribe(data => {
    //   alert('login');
    //   alert(data['body']);
    //   if (this.loginService.isLoggedIn) {
    //     // Get the redirect URL from our auth service
    //     // If no redirect has been set, use the default
    //     const redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/nominate';
    //
    //     // Redirect the user
    //     this.router.navigate([redirect]);
    //   }
    // });
  }

  logout() {
    this.loginService.logout();
  }

  signUp(f: NgForm) {









    const config = {
      apiKey: 'AIzaSyBgZ8kKdeXOMtwr5OheuYNEtngBs0vCT2E',
      authDomain: 'red-carpet-e4162.firebaseapp.com',
      databaseURL: 'https://red-carpet-e4162.firebaseio.com',
      projectId: 'red-carpet-e4162',
      storageBucket: 'red-carpet-e4162.appspot.com',
      messagingSenderId: '191054498306'
    };
    firebase.initializeApp(config);
    firebase.auth().languageCode = 'it';

    const lf = this.login;

    function func(currentUser, credential, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log(currentUser);
      alert(currentUser.email);
      lf();
      // f.form.patchValue({
      //     username : currentUser.email
      //   }
      // );
      // (<HTMLInputElement>document.getElementById('username')).value = currentUser.email;
      // console.log(credential);
      // console.log(redirectUrl);
      return true;
    }



    // const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // const uiConfig = {
    //   callbacks: {
    //     signInSuccess: func,
    //     uiShown: function() {
    //       // The widget is rendered.
    //       // Hide the loader.
    //       document.getElementById('loader').style.display = 'none';
    //     }
    //   },
    //   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //   signInFlow: 'popup',
    //   signInSuccessUrl: 'nominate',
    //   signInOptions: [
    //     // Leave the lines as is for the providers you want to offer your users.
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //   ],
    //   // Terms of service url.
    //   tosUrl: 'https://www.google.com'
    // };
    // ui.start('#firebaseui-auth-container', uiConfig);
  }

  signUpEmail(email) {

  }
}
