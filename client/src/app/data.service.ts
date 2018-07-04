import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private API: string = environment.apiUrl;
  tasks: any;

  constructor(private _HttpClient: HttpClient) { }

  // getTasks() {
  //   return this._http.get('/tasks').map(tasks => this.tasks = tasks.json().data);
  // }

}
