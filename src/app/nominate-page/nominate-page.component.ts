import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Nominee} from '../models/nominee.model';
import {FormGroup, FormControl} from '@angular/forms';
import {DashboardService} from '../services/dashboard.service';
import {School} from '../models/school.model';
import {Type} from '../models/Type.model';
import {UserService} from '../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../services/login.service';


@Component({
  selector: 'app-nominate-page',
  templateUrl: './nominate-page.component.html',
  styleUrls: ['./nominate-page.component.css'],
  providers: []
})
export class NominatePageComponent implements OnInit {

  schools: School[] = [];
  types: Type[] = [];
  formNominee: Nominee = new Nominee();
  nomineeForm: FormGroup;
  isToUpdate = false;

  private file: File; // for photo
  limitSize = 2;
  imgSrc = '';
  localImgName = '上传文件';



  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private loginService: LoginService,
              private dashboardService: DashboardService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    // TODO: resolver for schools and types
    this.userService.getSchools().subscribe(
      data => {
        this.schools = data['body'];
      }
    );
    this.userService.getTypes().subscribe(
      data => {
        this.types = data['body'];
      }
    );
    // this.userService.loadPhoto().subscribe(
    //   data => {
    //     let imageType = 'data:image/jpg;base64,';
    //     const base64 = data['body'];
    //     if (base64.charAt(0) === '/') {
    //       imageType = 'data:image/jpg;base64,';
    //     } else if (base64.charAt(0) === 'R') {
    //       imageType = 'data:image/gif;base64,';
    //     } else if (base64.charAt(0) === 'i') {
    //       imageType = 'data:image/png;base64,';
    //     }
    //     this.noce = this.sanitizer.bypassSecurityTrustUrl(imageType + data['body']);
    //   },
    //   error => console.log(error)
    // );
    console.log(this.nomineeForm);

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
        const modalNominee = this.userService.modifyNominee;
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
      if (params['superid']) {
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
      this.file = file;
      const imageType = /^image\//;
      // whether it is a image
      if (!imageType.test(file.type)) {
        alert('请上传图片格式文件');
        return;
      }
      reader.readAsDataURL(file); // read file as data url
      reader.onload = () => { // called once readAsDataURL is completed

        // check the size of img
        if (this.limitSize && file.size > this.limitSize * 1024 * 1024) {
          alert('图片大小已超过 ' + this.limitSize + ' M 限制');
          return;
        }
        this.imgSrc = reader.result;
        console.log('图片imgSrc' + reader.result);
        this.localImgName = file.name;
        this.file = file;

      };

    }
  }

  uploadPhoto() {
    // return the filename which is stored in the disk
    console.log(this.file.name);
    this.userService.postPhoto(this.file).subscribe(
      data => {
        this.formNominee.photo = data['body'];
        console.log(data);
        alert('上传成功');
      },
      error => console.log(error)
    );
  }

  // TODO: how to upload image?
  onStoreNominee() {
    // user authority
    this.formNominee.converFromForm(this.nomineeForm);
    this.formNominee.refereeId = this.loginService.loginUserId;
    console.log(this.formNominee);
    this.userService.postNomination(this.formNominee).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error1 => console.log(error1)
    );
  }

  onModifyNominee(nominee: Nominee) {
    // user with permission or admin
  }

  backHome() {
    this.router.navigate(['/']);
  }

}
