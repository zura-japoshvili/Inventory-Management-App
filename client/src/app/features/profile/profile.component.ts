import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FullUserData} from "../../core/interfaces/fullUserData";
import {UserAuthService} from "../../core/services/user-auth.service";
import {UserDataService} from "../../core/services/user-data.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  constructor(private _userData: UserDataService,
              private _change: ChangeDetectorRef) { }

  user: FullUserData = JSON.parse(localStorage.getItem('User')!);

  ngOnInit(): void {
    this._userData.getUserData().pipe(
      catchError(err => {
        return of ([]);
      })
    ).subscribe((value) => {
      localStorage.setItem("User", JSON.stringify(value));
      this.user = JSON.parse(localStorage.getItem('User')!);
      console.log(this.user)
      this._change.markForCheck();
    });
  }

}
