import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {
    this.userName = {};
    this.password = {};
  }

  userName: any;
  password: any;

  ngOnInit() {
  }

}
