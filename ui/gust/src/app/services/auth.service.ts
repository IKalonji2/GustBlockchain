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
  createUser(formBody: object) {
    let route: string = "/api/signup";
    return this.http.post(this.URL+route,formBody);
  }
  processOpt(formBody: object) {
    let route: string = "/api/verify-otp";
    return this.http.post(this.URL+route,formBody);
  }
  userLogin(formBody: object) {
    let route: string = "/api/login";
    return this.http.post(this.URL+route,formBody);
  }
}
