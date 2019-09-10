import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showLogin = true;

  constructor() {
   }

  ngOnInit() { }

  loginFormToggle() {
    this.showLogin = !this.showLogin;
  }

}
