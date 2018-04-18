import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rule = '每人一天限投10票；校内用户需登录UIS；校外用户需要注册方可提名和投票' ;

  constructor() { }

  ngOnInit() {
  }

}
