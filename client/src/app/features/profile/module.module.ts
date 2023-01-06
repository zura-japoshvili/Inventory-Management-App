import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {HeaderModule} from "../../shared/header/header/header.module";
import {NavigationModule} from "../../shared/navigation/navigation/navigation.module";



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      children: [
        {
          path: '', component: ProfileComponent
        },
        {
          path: 'editProfile',
          component: EditProfileComponent
        }
      ]
    }]),
    RippleModule,
    ButtonModule,
    HeaderModule,
    NavigationModule
  ]
})
export class ModuleModule { }
