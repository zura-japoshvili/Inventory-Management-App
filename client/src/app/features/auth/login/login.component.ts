import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {LoginInt} from "../../../core/interfaces/loginInt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private _userAuth: UserAuthService) { }

  ngOnInit(): void {
  }
  public loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  onLogin(){
    this._userAuth.userLogin(this.loginForm.value as LoginInt);
  }
}
