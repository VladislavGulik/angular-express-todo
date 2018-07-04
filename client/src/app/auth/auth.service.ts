import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  private API = environment.apiUrl;
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  signin(body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.API + '/users/signin', body, { headers })
      .map(res => res.json());
  }

  signup(body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.API + '/users/signup', body, { headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    sessionStorage.setItem('id_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    sessionStorage.clear();
  }
}
