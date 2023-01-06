import {NavigationComponent} from "../navigation.component";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import {PanelMenuModule} from "primeng/panelmenu";



@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
  ]
})
export class NavigationModule { }
