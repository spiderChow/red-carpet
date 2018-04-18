import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NominationComponent } from './home/nomination/nomination.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { NominatePageComponent } from './nominate-page/nominate-page.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nominate', component: NominatePageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NominationComponent,
    HomeComponent,
    HeaderComponent,
    NominatePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
