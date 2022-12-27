import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import * as path from "path";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {MessagesModule} from 'primeng/messages';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '', redirectTo: '/auth/login', pathMatch: "full"
        },
            {
                path: '', component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent
                    },
                    {
                        path: 'register',
                        component: RegisterComponent
                    },
                    {
                      path: 'forgetPassword',
                      component: ForgetPasswordComponent
                    },
                    {
                      path: 'resetPassword/:resetToken',
                      component: ResetPasswordComponent
                    }
                ]
            },
        ]),
        PaginatorModule,
        PasswordModule,
        DividerModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        MessageModule,
        MessagesModule,
    ]
})
export class AuthModule { }
