import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rule = '提名面向范围：全校本科、硕士、博士毕业生，全校教职工，及其他与复旦毕业生相关人士\n' +
    '可提名个人或团体，可提名本人或他人，单次提名2人及以上时请选择团体，提名1人请选择个人' ;
  searchForm: FormGroup;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchContent': new FormControl()
    });
  }

  // TODO: search for what?
  onSearch() {
    alert('search' + this.searchForm.value.searchContent);
  }

  login() {

  }

  onLoadNominatePage() {
    this.router.navigate(['/nominate']);
  }


}
