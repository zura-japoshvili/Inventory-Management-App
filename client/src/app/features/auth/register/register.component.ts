import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {RegistrationInt} from "../../../core/interfaces/registrationInt";
import {passwordValidator} from "../../../core/Validator/password-validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  constructor(private _userAuth: UserAuthService) { }

  ngOnInit(): void {
    this._userAuth.checkStatus();
  }

  public regForm =  new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      re_password: new FormControl("", [Validators.required, Validators.minLength(8)])
    },
    {
      validators: passwordValidator
    }
  )

  public onRegister(){
    this._userAuth.userRegistration(this.regForm.value as RegistrationInt).subscribe((value) => {
      console.log(value);
    })
  }
}
