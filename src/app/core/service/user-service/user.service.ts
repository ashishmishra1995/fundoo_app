import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import {  HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
    URL = environment.baseUrl;

public url;
public access_token=localStorage.getItem('id');
  public httpOptions ;
  public httpO;
  constructor(private service: HttpService) { }

  loginPost(RequestBody){
   
    this.url = this.URL+"/user/login";
    return this.service.post(this.url,RequestBody)
  }
  signupPost(RequestBody){
    this.url = this.URL +"/user/userSignUp";
    return this.service.post(this.url, RequestBody)

  }
  getCards(){
    this.url = this.URL +"/user/service";
    return this.service.get(this.url)
  }
  resetPassword(RequestBody){
    this.url = this.URL +"/user/reset";
    return this.service.post(this.url, RequestBody)
    
  }
  logout(RequestBody){
  
    this.url = this.URL +"/user/logout";
    return this.service.PostUrlEncoded(this.url, RequestBody)

  }
  setPassword(RequestBody,accesToken){
    
    this.url = this.URL +"/user/reset-password";
    return this.service.PostnewPassword(this.url, RequestBody,accesToken)

  }
  registerToken(RequestBody){
  
    this.url = this.URL +"/user/registerPushToken";
    return this.service.PostJson(this.url,RequestBody)
  }
}