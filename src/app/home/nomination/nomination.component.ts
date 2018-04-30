import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Nominee} from '../../models/nominee.model';
import * as $ from 'jquery';
import { NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css'],

})
export class NominationComponent implements OnInit {
  public nominees;
  modalNominee: Nominee = new Nominee();
  imgSrc;
  @ViewChild('f') voteForm: NgForm;

  constructor(private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer
              ) {
  }

  ngOnInit() {
    // fetch data before navigate
    this.route.data.subscribe(
      (data: any) => {
        this.nominees = data.nominees;
        this.nominees.map( n => {
         n.votesNumber = 0; // set all voteNumber as 0
        });
      }
    );

    this.userService.getNominationVote().subscribe(
      data => {
        const votes = data['body'];
        votes.map( vote => {
          this.nominees.map( n => {
           if (n.id === vote[0]) {
             n.votesNumber = vote[1];
           }
          });
        }
        );
      }
    );
  }

  // TODO: what is the format of the votes
  onVote(voteForm: NgForm) {
    console.log(voteForm.value);
    this.userService.postVotes(voteForm.value).subscribe(
      data => {
        console.log(data);
        alert('投票成功');
        this.router.navigate(['/']);

      },
      error => {
        console.log(error);
        alert('投票失败' + error.error.message);
        this.router.navigate(['/']); // 如何refresh？
      }
    );

  }

  // TODO: not the same with the reload, it has more to load in it.
  viewNominee(nominee: Nominee) {
    this.userService.getNomineeById(nominee).subscribe(
      data => {
        this.modalNominee = data['body'];
        this.modalNominee.votesNumber = nominee.votesNumber; // TODO: not very consistent
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
            this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageType + data2['body']);
          },
          error => console.log(error)
        );
      },
      error1 => console.log(error1)
    );
  }

  modifyNominee(nominee: Nominee) {
    this.userService.modifyNominee = nominee;
    this.router.navigate(['/nominate', {id: nominee.id}]);
  }


}

