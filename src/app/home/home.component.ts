import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rule = '提名面向范围：全校本科、硕士、博士毕业生，全校教职工，及其他与复旦毕业生相关人士\n' +
    '可提名个人或团体，可提名本人或他人，单次提名2人及以上时请选择团体，提名1人请选择个人';


  constructor(private router: Router,
              private userService: UserService,
              private  loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  onLoadNominatePage() {
    this.router.navigate(['/nominate']);
  }


}
