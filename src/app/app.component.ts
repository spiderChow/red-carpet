import { Component } from '@angular/core';
import * as $ from 'jquery';
import {DashboardService} from './dashboard/dashboard.service';
import {NominationService} from './home/nomination/nomination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DashboardService, NominationService ]

})
export class AppComponent {
  title = 'app';
}
