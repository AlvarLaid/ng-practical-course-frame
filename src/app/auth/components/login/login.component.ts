import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCredentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() showSignUpForm: EventEmitter = new EventEmitter();
  @Output() loginRequested = new EventEmitter<UserCredentials>();

  constructor() {
    this.userName = {};
    this.password = {};
  }

  userName: any;
  password: any;

  ngOnInit() {
  }

  showSignUp() {
    this.showSignUpForm.emit('');
  }

  onSubmit() {
    this.loginRequested.emit({ username: this.userName, password: this.password });
  }
}
