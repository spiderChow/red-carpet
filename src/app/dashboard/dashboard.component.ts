import {Component, OnInit} from '@angular/core';
import {Nominee} from '../models/nominee.model';
import {DashboardService} from '../services/dashboard.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  nominees: Nominee[];
  modalNominee: Nominee = new Nominee();
  imgSrc;


  constructor(private dashboardService: DashboardService,
              private router: Router,
              private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.dashboardService.getAllNominations().subscribe(
      data => {
        this.nominees = data['body'];
        this.nominees.map(n => {
          n.votesNumber = 0; // set all voteNumber as 0
        });
        this.userService.getNominationVote().subscribe(
          data2 => {
            const votes = data2['body'];
            console.log(votes);

            votes.map(vote => {
                this.nominees.map(n => {
                  if (n.id === vote[0]) {
                    n.votesNumber = vote[1];
                  }
                });
              }
            );

          }
        );

      }
      ,
      error1 => console.log(error1)
    );


  }

  deleteNominee(nominee: Nominee) {
    this.dashboardService.deleteNominee(nominee).subscribe(
      data => {
        alert('删除成功');
        this.nominees.splice(this.nominees.indexOf(nominee), 1);
      },
      error => {
        alert('失败' + error.error.message);

      }
    );
  }

  passNominee(nominee: Nominee) {
    this.dashboardService.passNominee(nominee).subscribe(
      data => {
        alert('pass 完成');
        nominee.passed = true;
      },
      error => {
        alert('失败' + error.error.message);

      }
    );
  }

  viewNominee(nominee: Nominee) {
    this.imgSrc = null;
    this.userService.imgSrc = null;
    this.modalNominee = nominee;
    console.log(this.modalNominee);

    this.userService.loadPhoto(this.modalNominee.photo).subscribe(
      data2 => {
        let imageType = 'data:image/jpg;base64,';
        const base64 = data2['body'];
        if (base64.charAt(0) === '/') {
          imageType = 'data:image/jpg;base64,';
        } else if (base64.charAt(0) === 'R') {
          imageType = 'data:image/gif;base64,';
        } else if (base64.charAt(0) === 'i') {
          imageType = 'data:image/png;base64,';
        }
        this.userService.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageType + data2['body']);
        this.imgSrc = this.userService.imgSrc;
      },
      error => console.log(error)
    );


  }


  modifyNominee(nominee: Nominee) {
    this.dashboardService.modalNominee = nominee;
    this.userService.modifyNominee = nominee;
    this.router.navigate(['/modify']);
  }

  superVote(f: NgForm) {
    const weight = f.form.get('weight').value;
    console.log(weight);
    console.log(this.modalNominee.id);
    if (weight > 0) {
      this.dashboardService.superVote(this.modalNominee, weight).subscribe(
        data => {
          alert('投了' + data['body'] + '票');
          this.modalNominee.votesNumber += weight;

        },
        error => {
          alert('投票失败' + error.error.message);
        }
      );
    }
  }

}
