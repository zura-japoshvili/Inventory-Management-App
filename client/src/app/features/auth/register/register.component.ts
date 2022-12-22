import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  constructor(private _userAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  public regForm =  new FormGroup(
    {
      email: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      re_password: new FormControl("", Validators.required)
    }
  )

  public onRegister(){
    console.log(this.regForm.value)
  }
}
