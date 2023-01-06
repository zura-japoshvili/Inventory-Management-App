import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {FullUserData} from "../../core/interfaces/fullUserData";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private _userAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  public user: FullUserData = JSON.parse(localStorage.getItem('User')!);

  public logoutUser(){
    this._userAuth.logoutUser()
  }

}
