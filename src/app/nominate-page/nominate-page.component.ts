import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NomineeService} from './nominee.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Nominee} from '../models/nominee.model';
import {FormGroup, FormControl} from '@angular/forms';
import {DashboardService} from '../dashboard/dashboard.service';


@Component({
  selector: 'app-nominate-page',
  templateUrl: './nominate-page.component.html',
  styleUrls: ['./nominate-page.component.css'],
  providers: [ NomineeService ]
})
export class NominatePageComponent implements OnInit {
  fileUploadlabel = '上传文件';
  url = '';
  schools = [];
  formNominee: Nominee = new Nominee();
  nomineeForm: FormGroup;
  isToUpdate = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private nomineeService: NomineeService,
              private dashboardService: DashboardService) {
  }

  ngOnInit() {
    $(document).ready(function () {
      $('button').click(function () {
        const div = $('div');
        div.animate({left: '100px'}, 'slow');
        div.animate({fontSize: '5em'}, 'slow');
      });
    });
    this.schools = this.nomineeService.schools;

    this.nomineeForm = new FormGroup(
      {
        'photo': new FormControl(null),
        'introduction': new FormControl(null),
        'story': new FormControl(null),
        'name': new FormControl(null),
        'school': new FormControl(null),
        'type': new FormControl(null),
        'referee': new FormControl(null),
        'refereeContactInfo': new FormControl(null),
        'remark': new FormControl(null),
      }
    );

    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        const modalNominee = this.dashboardService.modalNominee;
        this.nomineeForm.patchValue({
          name: modalNominee.name,
          introduction: modalNominee.introduction,
          story: modalNominee.story,
          referee: modalNominee.referee,
          refereeContactInfo: modalNominee.refereeContactInfo,
          remark: modalNominee.remark,
        });
        this.isToUpdate = true;
        this.formNominee.id = params['id'];
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      const file = event.target.files[0];
      reader.readAsDataURL(file); // read file as data url

      reader.onload = () => { // called once readAsDataURL is completed
        this.url = reader.result;
        this.fileUploadlabel = file.name;
      };
    }
  }

  onStoreNominee() {


    this.formNominee.introduction = this.nomineeForm.value.introduction as string;
    this.formNominee.name = this.nomineeForm.value.name as string;
    this.formNominee.referee = this.nomineeForm.value.referee as string;
    this.formNominee.refereeContactInfo = this.nomineeForm.value.refereeContactInfo as string;
    this.formNominee.remark = this.nomineeForm.value.remark as string;
    this.formNominee.story = this.nomineeForm.value.story as string;
    this.formNominee.school.id =  1;
    this.formNominee.type.id = 1;


    if (this.isToUpdate) {
      this.dashboardService.updateNominee(this.formNominee).subscribe(
        data => {
          console.log(data);
        }
      );
      this.router.navigate(['/dashboard']);

    } else {

      this.nomineeService.onStoreNominee(this.formNominee).subscribe(
        response => console.log(response),
        error1 => console.log(error1)
      );
      this.router.navigate(['/']);
    }
  }

}
