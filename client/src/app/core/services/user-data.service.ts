import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FullUserData} from "../interfaces/fullUserData";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  private httpsOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }


  public getUserData(): Observable<FullUserData>{
    return this.http.get<FullUserData>("http://localhost:8000/api/users/getUser", this.httpsOptions);
  }
}
