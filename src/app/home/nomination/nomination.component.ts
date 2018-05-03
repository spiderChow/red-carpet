import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Nominee} from '../../models/nominee.model';
import * as $ from 'jquery';
import 'bootstrap';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../services/login.service';

declare var initGeetest: any;

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css'],

})
export class NominationComponent implements OnInit {
  public nominees;
  max = 0;
  modalNominee: Nominee = new Nominee();
  @ViewChild('f') voteForm: NgForm;
  chosenNominees: Nominee[] = [];
  maxChosenSize = 5;
  imgSrc;

  gtValid = false;

  constructor(private router: Router,
              private userService: UserService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.loginService.gtInit().subscribe(
      data => {
        console.log(data);

        let that = this;
        initGeetest(
          {
            // 以下配置参数来自服务端 SDK

            gt: data['gt'],
            challenge: data['challenge'],
            offline: !data['success'],
            new_captcha: true,
            product: 'popup'

          }, function (captchaObj) {
            captchaObj.appendTo('#captchaBox'); // 将验证按钮插入到宿主页面中captchaBox元素内
            captchaObj.onReady(function () {
              console.log('ready');
              console.log('gtvalid is ' + that.gtValid);
            }).onSuccess(function () {
                // your code
                console.log('success');
                that.gtValid = true;
              }
            ).onError(function () {
              console.log('error');
            });
          });
      }
    );


    // fetch data before navigate
    this.route.data.subscribe(
      (data: any) => {
        this.nominees = data.nominees;
        this.nominees.map(n => {
          n.votesNumber = 0; // set all voteNumber as 0
        });
      }
    );

    this.userService.getNominationVote().subscribe(
      data => {
        const votes = data['body'];
        console.log(votes);
        votes.map(v => {
          if (this.max < v[1]) {
            this.max = v[1];
          }
        });
        console.log(this.max);


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

    // handle the effect of the progress

  }


  // for the check effect
  checkItem(event, nominee: Nominee) {
    // if (!this.loginService.isLoggedIn) {
    //   alert('请先登录');
    //   return;
    // }
    if (event.target.checked && this.chosenNominees.length < this.maxChosenSize) {
      this.chosenNominees.push(nominee);
    } else if (event.target.checked && this.chosenNominees.length >= this.maxChosenSize) {
      event.target.checked = false;
      $('#max-number-alert').modal('show');

    } else {
      for (let i = 0; i < this.chosenNominees.length; i++) {
        if (this.chosenNominees[i].id === nominee.id) {
          this.chosenNominees.splice(i, 1);
        }
      }

    }
    console.log(this.chosenNominees);
  }

  remove(index, nom) {
    this.chosenNominees.splice(index, 1);
    for (const n of this.nominees) {
      if (n.id === nom.id) {
        (<HTMLInputElement>document.getElementById(nom.id)).checked = false;
      }
    }
  }


  onVote(voteForm: NgForm) {
    if (!this.gtValid) {
      alert('验证之后才能投票');
      return;
    }

    let ids = this.chosenNominees.map(
      item => item.id
    );
    console.log(this.chosenNominees);
    console.log(ids);
    this.userService.postVotes(ids).subscribe(
      data => {
        console.log(data);
        alert('投票成功');
        this.fetchItSelf();
      },
      error => {
        console.log(error);
        alert('投票失败' + error.error.message);
      }
    );


  }

  /**
   * only reload the photo for the Nominee
   * since the photo name has already gotten when the home page first loaded.
   * @param {Nominee} nominee
   */
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
    this.userService.modifyNominee = nominee; // set the data for the modify page to preload
    // this.router.navigate(['/modify']);
    this.router.navigate(['/login']);
  }

  /**
   * JUST MOCK!!
   */
  fetchItSelf() {
    // this.userService.getPassedNomineeList().subscribe(
    //   (data) => {
    //     this.nominees = data['body'];
    //     this.nominees.map(n => {
    //       n.votesNumber = 0; // set all voteNumber as 0
    //     });
    //   }
    // );
    //
    // this.userService.getNominationVote().subscribe(
    //   data => {
    //     const votes = data['body'];
    //     votes.map(vote => {
    //         this.nominees.map(n => {
    //           if (n.id === vote[0]) {
    //             n.votesNumber = vote[1];
    //           }
    //         });
    //       }
    //     );
    //   }
    // );
    for (let n of this.chosenNominees) {
      n.votesNumber++;
      (<HTMLInputElement>document.getElementById(n.id)).checked = false;
    }

  }


}

