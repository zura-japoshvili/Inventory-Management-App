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



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent
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
  ]
})
export class AuthModule { }
