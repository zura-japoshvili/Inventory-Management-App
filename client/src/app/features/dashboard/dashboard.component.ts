import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {catchError, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {FullUserData} from "../../core/interfaces/fullUserData";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(private _userAuth: UserAuthService,
              private _router: Router) { }

  user: FullUserData = JSON.parse(localStorage.getItem('User')!);

  ngOnInit(): void {
    console.log(this.user)
    this._userAuth.checkStatus().pipe(
      tap((value) => {
        if (!value){
          this._router.navigateByUrl('/auth/login').then();
        }
      }),
      catchError(err => {
        // To error page or login p
        // this._router.navigateByUrl('/auth/login').then();
        return of ([])
      })
    ).subscribe()
  }


}
