import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NominationService} from './nomination.service';
import {Nominee} from '../../models/nominee.model';
import * as $ from 'jquery';
import {FormArray, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css'],

})
export class NominationComponent implements OnInit {
  public nominees: Nominee[] = [];
  modalNominee: Nominee = new Nominee();
  voteForm: FormGroup;

  constructor(private router: Router, private nominationService: NominationService) {}

  ngOnInit() {
    this.voteForm = new FormGroup({
      'votes': new FormArray([])
    });


    this.nominationService.loadNominations().subscribe(
      (data) =>  {
        console.log(data);
        this.nominees = data['body'];
      },
      (error) => console.error(error)
  );
  }


  onSubmit() {
       console.log(form.value);
       this.nominationService.onSubmitVotes(form.value).subscribe(
         data => console.log(data),
         error => console.log(error)
       );
      alert('投票成功');

  }

  viewNominee(nominee: Nominee) {
    this.nominationService.onViewNominee(nominee).subscribe(
      data => {
        this.modalNominee = data['body'];
        console.log(this.modalNominee);
      },
      error1 => console.log(error1)
    );
  }

}

