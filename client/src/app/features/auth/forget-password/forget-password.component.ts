import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgetPasswordComponent implements OnInit {


  constructor(private messageService: MessageService,
              private _userAuth: UserAuthService) { }

  emailField = new FormControl("", [Validators.required, Validators.email]);

  ngOnInit(): void {
  }

  onClick() {
    this._userAuth.forgetPassword(this.emailField.value as string).pipe(
      tap((value) => {
        this.showMessage("success", '200', value.message);
      }),
      catchError(err => {
        this.showMessage("error", err.status, err.error);
        return of ([])
      })
    ).subscribe()
  }

  private showMessage(severity:string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail});
    setTimeout (() => {
      this.messageService.clear();
    }, 3000);
  }
}
