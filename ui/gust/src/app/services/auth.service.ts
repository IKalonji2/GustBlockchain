import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment.development';

import { UserFormObject } from '../model/user-object';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }
  CreateUser(formBody:UserFormObject) {
    let route: string = "/api/signUp";
    return this.http.post(this.URL+route,formBody);
  }
}
