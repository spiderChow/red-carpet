import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgForm, Validator, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Nominee} from '../models/nominee.model';
import {FormGroup, FormControl} from '@angular/forms';
import {DashboardService} from '../services/dashboard.service';
import {School} from '../models/school.model';
import {Type} from '../models/Type.model';
import {UserService} from '../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../services/login.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

declare var initGeetest: any;



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

  private file: File; // for photo
  limitSize = 2;
  imgSrc;
  localImgName = '';
  isModifyPage = false;
  gtValid = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private loginService: LoginService,
              private dashboardService: DashboardService,
              private sanitizer: DomSanitizer) {
    this.nomineeForm = new FormGroup(
      {
        'photo': new FormControl(null),
        'introduction': new FormControl(null, [Validators.required, Validators.maxLength(15)]),
        'story': new FormControl(null, Validators.maxLength(140)),
        'name': new FormControl(null, Validators.required),
        'school': new FormControl(null, Validators.required),
        'type': new FormControl(null, Validators.required),
        'referee': new FormControl(null, Validators.required),
        'refereeContactInfo': new FormControl(null, Validators.required),
        'remark': new FormControl(null),
      }
    );
    this.imgSrc = this.userService.imgSrc;

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

    // prefetch the School types and Nominee types
    this.route.data.subscribe(
      (data: any) => {
        console.log(data);
        this.schools = data.schools;
        this.types = data.types;
        if (data.formNominee) {
          this.isModifyPage = true;
          this.formNominee.converFromNominee(data.formNominee);

          this.nomineeForm.patchValue({
            name: this.formNominee.name,
            introduction: this.formNominee.introduction,
            story: this.formNominee.story,
            referee: this.formNominee.referee,
            refereeContactInfo: this.formNominee.refereeContactInfo,
            remark: this.formNominee.remark,
          });
          this.nomineeForm.controls['school'].setValue(this.formNominee.school.id, {onlySelf: true});
          this.nomineeForm.controls['type'].setValue(this.formNominee.type.id, {onlySelf: true});


        }
      }
    );

  }

  /**
   * set the filename on the label and preview the img
   * i.e., set this.imgSrc and localImgName as well as file: File
   * @param event
   */
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


  /**
   * should clear the three variables modified in the onSelectFile()
   */
  clearPhoto() {
    this.imgSrc = '';
    this.localImgName = '';
    this.file = null;
  }

  onStoreNominee() {

    // user authority
    if (!this.gtValid) {
      alert('验证后才能提交');
      return;
    }
    // first, upload the photo
    // this.uploadPhoto();
    /**
     * upload the file and return the filename in the disk
     */
    // make the http execute in series
    this.userService.postPhoto(this.file).subscribe(
      data => {
        this.formNominee.photo = data['body'];
        alert('上传图片成功');
        // then, bind other form data
        this.formNominee.converFromForm(this.nomineeForm);
        // last but not least, bind the loginUser with this Nominee
        this.formNominee.refereeId = this.nomineeForm.get('refereeContactInfo').value;
        console.log(this.formNominee);
        if (this.isModifyPage) {
          this.userService.updateNomination(this.formNominee).subscribe(
            response => {
              console.log(response);
              alert('上传提名人信息成功');
              this.router.navigate(['/']);
            },
            error1 => {
              console.log(error1);
              alert('似乎上传失败了');
            }
          );

        } else {
          this.userService.postNomination(this.formNominee).subscribe(
            response => {
              console.log(response);
              alert('上传提名人信息成功');
              this.router.navigate(['/']);
            },
            error1 => {
              console.log(error1);
              alert('似乎上传失败了');
            }
          );
        }
      },
      error => {
        console.log(error);
        this.formNominee.photo = null;
        alert('上传图片不成功，请联系管理员');
        // then, bind other form data
        this.formNominee.converFromForm(this.nomineeForm);
        // last but not least, bind the loginUser with this Nominee
        this.formNominee.refereeId = this.nomineeForm.get('refereeContactInfo').value;
        console.log(this.formNominee);
        if (this.isModifyPage) {
          this.userService.updateNomination(this.formNominee).subscribe(
            response => {
              console.log(response);
              alert('上传提名人信息成功');
              this.router.navigate(['/']);
            },
            error1 => {
              console.log(error1);
              alert('似乎上传失败了');
            }
          );

        } else {
          this.userService.postNomination(this.formNominee).subscribe(
            response => {
              console.log(response);
              alert('上传提名人信息成功');
              this.router.navigate(['/']);
            },
            error1 => {
              console.log(error1);
              alert('似乎上传失败了');
            }
          );
        }

      }
    );


  }


}
