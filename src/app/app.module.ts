import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NominationComponent } from './home/nomination/nomination.component';
import { HomeComponent } from './home/home.component';
import { NominatePageComponent } from './nominate-page/nominate-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nominate', component: NominatePageComponent },
  { path: 'nominate/:id', component: NominatePageComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NominationComponent,
    HomeComponent,
    NominatePageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
