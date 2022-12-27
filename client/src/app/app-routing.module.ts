import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarterComponent} from "./features/starter/starter.component";
import {AuthComponent} from "./features/auth/auth.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "starter",
    pathMatch: "full"
  },
  {
    path: 'starter',
    component: StarterComponent
  },
  {
    path: "auth",
    loadChildren: () =>
      import('./features/auth/auth.module').then(
        (res) => res.AuthModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/module/dashboard.module').then(
        (res) => res.DashboardModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
