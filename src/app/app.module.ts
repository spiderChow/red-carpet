import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NominationComponent} from './home/nomination/nomination.component';
import {HomeComponent} from './home/home.component';
import {NominatePageComponent} from './nominate-page/nominate-page.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {UserGuard} from './router-helper/user-guard.service';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {DashboardService} from './services/dashboard.service';
import {NomineeResolver} from './router-helper/NomineeResolver';
import {ModifyGuardService} from './router-helper/modify-guard.service';
import {SchoolTypesResolver} from './router-helper/schoolTypes-resolver';
import {NomineeTypesResolver} from './router-helper/nomineeTypes-resolver';
import {ModifyResolver} from './router-helper/modify-resolver';


const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: {
      nominees: NomineeResolver
    }
  },

  {
    path: 'modify',
    component: NominatePageComponent,
    // canActivate: [ ModifyGuardService],
    resolve: {
      formNominee: ModifyResolver,
      schools: SchoolTypesResolver,
      types: NomineeTypesResolver
    }
    // canActivateChild: [UserGuard]
  },
  {
    path: 'nominate',
    component: NominatePageComponent,
    // canActivate: [UserGuard],
    resolve: {
      schools: SchoolTypesResolver,
      types: NomineeTypesResolver
    }
  },
  {path: 'nominate/:superid', component: NominatePageComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [UserGuard],
    // canActivateChild: [UserGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NominationComponent,
    HomeComponent,
    NominatePageComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),  // <-- debugging purposes only
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    UserService,
    DashboardService,
    NomineeResolver,
    SchoolTypesResolver,
    NomineeTypesResolver,
    UserGuard,
    ModifyGuardService,
    ModifyResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
