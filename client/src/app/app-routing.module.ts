import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarterComponent} from "./features/starter/starter.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "starter",
    pathMatch: "full"
  },
  {
    path: 'starter',
    component: StarterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
