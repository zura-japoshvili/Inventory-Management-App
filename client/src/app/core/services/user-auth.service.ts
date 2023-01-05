import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationInt} from "../interfaces/registrationInt";
import {Observable} from "rxjs";
import {FullUserData} from "../interfaces/fullUserData";
import {LoginInt} from "../interfaces/loginInt";
import {ForgetPswdInt} from "../interfaces/forgetPswdInt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient,
              private _router: Router) { }

  private httpsOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  public userRegistration(userData: RegistrationInt): Observable<FullUserData> {
    const {name, email, password} = userData
    return this.http.post<FullUserData>("http://localhost:8000/api/users/register", {name, email, password});
  }

  public userLogin(userData: LoginInt): Observable<FullUserData>{
    return this.http.post<FullUserData>("http://localhost:8000/api/users/login", userData, this.httpsOptions)
  }

  public checkStatus(): Observable<boolean>{
    return this.http.get<boolean>("http://localhost:8000/api/users/loginStatus", this.httpsOptions)
  }

  public forgetPassword(email: string): Observable<ForgetPswdInt>{
    console.log(email)
    return this.http.post<ForgetPswdInt>("http://localhost:8000/api/users/forgetPassword", {email});
  }

  public resetPassword(newPass: string, Token: string): Observable<{message: string}>{
    return this.http.put<{message: string}>("http://localhost:8000/api/users/resetPassword/"+ Token , {password: newPass});
  }

  public logoutUser(){
    this.http.get("http://localhost:8000/api/users/logout").subscribe((value) => {
      localStorage.removeItem("User");
      this._router.navigateByUrl('/auth/login').then();
    });
  }

}
