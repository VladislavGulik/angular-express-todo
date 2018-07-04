import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  credentials: any = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(payload) {
    this.authService.signin(payload).subscribe(
      (message) => {
        this.authService.storeUserData(message.token, payload.username);
        console.log(message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSignUp(payload) {
    this.authService.signup(payload).subscribe(
      (message) => {
        console.log(message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogOut() {
    this.authService.logout();
  }
}
