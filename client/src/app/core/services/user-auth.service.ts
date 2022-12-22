import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationInt} from "../interfaces/registrationInt";
import {Observable} from "rxjs";
import {FullUserData} from "../interfaces/fullUserData";
import {LoginInt} from "../interfaces/loginInt";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }


  public userRegistration(userData: RegistrationInt): Observable<FullUserData> {
    const {name, email, password} = userData
    return this.http.post<FullUserData>("http://localhost:8000/api/users/register", {name, email, password});
  }

  public userLogin(userData: LoginInt){
    this.http.post("http://localhost:8000/api/users/login", userData).subscribe((value) => {
      console.log(value)
    })
  }

  public checkStatus(){
    this.http.get("http://localhost:8000/api/users/loginStatus", {withCredentials: true}).subscribe((value) => {
      console.log(value);
    })
  }
}
