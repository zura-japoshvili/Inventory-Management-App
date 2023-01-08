import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FullUserData} from "../../../core/interfaces/fullUserData";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {ChangePass} from "../../../core/interfaces/changePass";
import {catchError, of, tap} from "rxjs";
import {UserDataService} from "../../../core/services/user-data.service";
import {EditUserData} from "../../../core/interfaces/editUserData";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  user: FullUserData = JSON.parse(localStorage.getItem('User')!)

  passForm = new FormGroup({
    oldPassword: new FormControl("", [Validators.required]),
    repeatPass: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required)
  })
  editForm = new FormGroup({
    name: new FormControl(this.user.name, Validators.required),
    email: new FormControl({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
    phone: new FormControl(this.user.phone, Validators.required),
    bio: new FormControl(this.user.bio, Validators.required)

  })
  constructor(private messageService: MessageService,
              private _userAuth: UserAuthService,
              private _userData: UserDataService) { }

  ngOnInit(): void {

  }

  // for message popup
  private showMessage(severity:string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail});
    setTimeout (() => {
      this.messageService.clear();
    }, 3000);
  }

  public changePass(){
    this._userAuth.changePassword(this.passForm.value as ChangePass).pipe(
      tap((value) => {
        this.showMessage("success", value.status, value.message);
      }),
      catchError(err => {
        this.showMessage("error", err.status, err.error);
        return of ([]);
      })
    ).subscribe();
  }

  public editUserData(){
    this._userData.editUserData(this.editForm.value as EditUserData).pipe(
      tap((value) => {
        localStorage.setItem("User", JSON.stringify(value));
        this.user = JSON.parse(localStorage.getItem('User')!);
        this.showMessage("success", '200', 'User data is successfully changed');
      }),
      catchError(err => {
        this.showMessage("error", err.status, err.error);
        return of ([]);
      })
    ).subscribe();
  }


  public editImage(event: Event){

  }
}
