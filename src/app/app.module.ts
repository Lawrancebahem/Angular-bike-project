import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import {CustomDatePipe} from './components/mainpage/header/custom.datepipe';
import {AppRoutingModule,} from './app-routing-module';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1componentComponent} from './components/scooterssource/overview1component/overview1component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Overview1componentComponent,
    NavBarComponent,
    CustomDatePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
