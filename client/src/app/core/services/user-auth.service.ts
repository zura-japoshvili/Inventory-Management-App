import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationInt} from "../interfaces/registrationInt";
import {Observable} from "rxjs";
import {FullUserData} from "../interfaces/fullUserData";
import {LoginInt} from "../interfaces/loginInt";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  private httpsOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  public userRegistration(userData: RegistrationInt): Observable<FullUserData> {
    const {name, email, password} = userData
    return this.http.post<FullUserData>("http://localhost:8000/api/users/register", {name, email, password});
  }

  public userLogin(userData: LoginInt){
    this.http.post("http://localhost:8000/api/users/login", userData, this.httpsOptions).subscribe((value) => {

    })
  }

  public checkStatus(){
    this.http.get("http://localhost:8000/api/users/loginStatus", this.httpsOptions).subscribe((value) => {
      console.log(value);
    })
  }
}
