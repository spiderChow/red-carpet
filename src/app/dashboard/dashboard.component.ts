import { Component, OnInit } from '@angular/core';
import {Nominee} from '../models/nominee.model';
import {DashboardService} from '../services/dashboard.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  nominees: Nominee[];
  modalNominee: Nominee = new Nominee();


  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.dashboardService.getAllNominations().subscribe(
      data => {
        this.nominees = data['body'];

        }
      ,
      error1 => console.log(error1)
    );

  }

  deleteNominee(nominee: Nominee) {
    this.dashboardService.deleteNominee(nominee).subscribe(
      data => {
        alert('删除成功');
      }
    );
  }
  passNominee(nominee: Nominee) {
    this.dashboardService.passNominee(nominee).subscribe(
      data => {
        alert('pass 完成');
      }
    );
  }

  viewNominee(nominee: Nominee) {
    this.modalNominee = nominee;
  }

  modifyNominee(nominee: Nominee) {
    this.dashboardService.modalNominee = nominee;
    this.router.navigate(['/nominate', { superid: nominee.id}]);
  }

  addNiminee() {
    this.router.navigate(['/nominate']);
  }

}
