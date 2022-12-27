import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              private _userAuth: UserAuthService) { }

  private Token!:string

  ngOnInit(): void {
    this.Token = this.route.snapshot.paramMap.get('resetToken')!;
  }



  resetForm = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    repeat: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  onClick(){
    this._userAuth.resetPassword(this.resetForm.get("password")!.value!, this.Token).pipe(
      tap((value) => {
        this.showMessage("success", '200', value.message);
      }),
      catchError(err => {
        this.showMessage("error", err.status, err.error);
        return of ([]);
      })
    ).subscribe();
  }

  private showMessage(severity:string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail});
    setTimeout (() => {
      this.messageService.clear();
    }, 3000);
  }

}
