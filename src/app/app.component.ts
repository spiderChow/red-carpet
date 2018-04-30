import { Component } from '@angular/core';
import * as $ from 'jquery';
import {DashboardService} from './services/dashboard.service';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []

})
export class AppComponent {
  title = 'app';
}
