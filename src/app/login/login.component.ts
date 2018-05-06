import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Form, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {DashboardService} from '../services/dashboard.service';

declare var initGeetest: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  refereeForm: FormGroup;
  adminForm: FormGroup;
  gtValid = false;
   isAdmin;
  @ViewChild('f') f: NgForm;

  constructor(private userService: UserService, private loginService: LoginService,
              private dashboardService: DashboardService,
              private router: Router) {
    /** window.location.href = 'https://tac.fudan.edu.cn/oauth2/authorize.act?client_id=1b135b2c-21ec-40ff-8848-f46233c644a1&response_type=code&state=1234&redirect_uri=http://yst.fudan.edu.cn/oauth';
     登录后跳转到：
     http://yst.fudan.edu.cn/oauth?client_id=1b135b2c-21ec-40ff-8848-f46233c644a1&code=7af9b33c-947a-4678-aa70-1b89f4e79ac5&scope=&state=1234
     或许用Nginx设置 yst.fudan.edu.cn 转到本服务器 后面的controller 一顿操作得到 username 在还给 index？？？
     */

    if (this.userService.modifyNominee == null) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;

    }
    this.refereeForm = new FormGroup(
      {
        'referee': new FormControl(null, Validators.required),
        'refereeContactInfo': new FormControl(null, Validators.required),
      }
    );
    this.adminForm = new FormGroup(
      {
        'username': new FormControl(null, Validators.required),
      }
    );

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

  }


  refereeValid() {
    if (!this.gtValid) {
      alert('需要验证才能提交');
      return;
    }

    const referee = this.refereeForm.get('referee').value;
    const refereeContactInfo = this.refereeForm.get('refereeContactInfo').value;
    // 查询 是否是
    this.userService.refereeValid(referee, refereeContactInfo).subscribe(
      data => {
        console.log(data['body']);
        const isValid = data['body'];
        if (isValid) {
          this.router.navigate(['/modify']);

        } else {
          alert('没通过验证');
        }
      }
    );


  }



  admin() {
    const userId = this.adminForm.get('username').value;
    this.loginService.admin(userId).subscribe(data => {
      const isExisted = data['body'];
      if (isExisted) {
        this.dashboardService.isAdminPassed = true;
        this.router.navigate(['/dashboard']);
      } else {
        alert('口令错误');
      }
    });
  }

}
