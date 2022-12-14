import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {LoginInt} from "../../../core/interfaces/loginInt";
import {catchError, of, tap} from "rxjs";
import {MessageService} from "primeng/api";
import {Message} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private _userAuth: UserAuthService,
              private messageService: MessageService,
              private _router: Router) { }

  ngOnInit(): void {
  }


  public loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  private showMessage(severity:string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail});
    setTimeout (() => {
      this.messageService.clear();
    }, 3000);
  }

  onLogin(){
    this._userAuth.userLogin(this.loginForm.value as LoginInt).pipe(
      tap((value) => {
        localStorage.setItem("User", JSON.stringify(value))
        this._router.navigateByUrl('/dashboard').then();
      }),
      catchError(err => {
        this.showMessage("error", err.status, err.error);
        return of ([]);
      })
    ).subscribe();
  }
}
