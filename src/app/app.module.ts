import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
