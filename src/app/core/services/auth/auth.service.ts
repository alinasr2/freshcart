import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient) { }
  userDta:any = null;
  private readonly router = inject(Router);
  sendRegisterForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signup`,data);
  }
  sendLoginForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signin`,data);
  }
  saveUserData():void
  {
    if(localStorage.getItem("token")){
      this.userDta = jwtDecode(localStorage.getItem("token")!);
    }
  }
  forgotPassword(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`,data)
  }
  verifyResetCode(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`,data)
  }
  resetPassword(data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`,data)
  }
  logOut():void
  {
    localStorage.removeItem("token");
    this.userDta = null;
    this.router.navigate(["/login"]);
  }
}
