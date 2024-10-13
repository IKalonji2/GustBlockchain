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
    let route: string = "/api/signUp";
    return this.http.post(this.URL+route,formBody);
  }
  processOpt(formBody: object) {
    let route: string = "/api/verifyOtp";
    return this.http.post(this.URL+route,formBody);
  }
  userLogin(formBody: object) {
    let route: string = "/api/login";
    return this.http.post(this.URL+route,formBody);
  }
  getWalletMnemonic() {
    let route: string = "/api/sendMnemonic";
    return this.http.get(this.URL+route);
  }
  getShuffledMnemonic() {
    let route: string = "/api/shuffledMnemonic";
    return this.http.get(this.URL+route);
  }
  getWallet() {
    let route: string = "/api/getWallet";
    return this.http.get(this.URL+route);
  }
  verifyMnemonic(postBody:object) {
    let route: string = "/api/verifyMnemonic";
    return this.http.post(this.URL+route,postBody);
  }
}
