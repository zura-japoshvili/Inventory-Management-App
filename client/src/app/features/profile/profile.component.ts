import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FullUserData} from "../../core/interfaces/fullUserData";
import {UserAuthService} from "../../core/services/user-auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  constructor(private _userAuth: UserAuthService) { }

  user: FullUserData = JSON.parse(localStorage.getItem('User')!);

  ngOnInit(): void {
  }

  public logoutUser(){
    this._userAuth.logoutUser()
  }
}
