import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "../../../shared/navigation/navigation.component";
import {Router, RouterModule} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";
import {NavigationModule} from "../../../shared/navigation/navigation/navigation.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule.forChild([{path: "", component: DashboardComponent}])
  ]
})
export class DashboardModule { }
