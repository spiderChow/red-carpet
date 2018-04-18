import { Component, OnInit } from '@angular/core';
import {Nominee} from './nominee.model';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {
  nominees: Nominee[] = [new Nominee('许宁生', '复旦大学校长'),
    new Nominee('周俊颖', '一个软件工程专业的菜鸡')];

  constructor() { }

  ngOnInit() {
  }

}
