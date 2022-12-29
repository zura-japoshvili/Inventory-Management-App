import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationModule} from "../../../shared/navigation/navigation/navigation.module";
import {RouterModule} from "@angular/router";
import {ProductComponent} from "../product.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule.forChild([{path: "", component: ProductComponent}])

  ]
})
export class ProductModule { }
