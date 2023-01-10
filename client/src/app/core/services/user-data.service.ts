import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FullUserData} from "../interfaces/fullUserData";
import {EditUserData} from "../interfaces/editUserData";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  private httpsOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  public editUserData(data: EditUserData): Observable<FullUserData>{
    return this.http.patch<FullUserData>("http://localhost:8000/api/users/updateUser", data, this.httpsOptions);
  }

  public changePhoto(data: FormData): Observable<{message: string, image: string}>{
    return this.http.post<{message: string, image: string}>("http://localhost:8000/api/users/changePhoto", data, {withCredentials: true});
  }

  public getUserData(): Observable<FullUserData>{
    return this.http.get<FullUserData>("http://localhost:8000/api/users/getUser", this.httpsOptions);
  }
}
