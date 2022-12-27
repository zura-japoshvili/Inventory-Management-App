import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarterComponent } from './features/starter/starter.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductComponent } from './features/product/product.component';
import {MessagesModule} from "primeng/messages";
import {NavigationComponent} from "./shared/navigation/navigation.component";
import {PanelMenuModule} from "primeng/panelmenu";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    DashboardComponent,
    ProductComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    PanelMenuModule,
    RippleModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
