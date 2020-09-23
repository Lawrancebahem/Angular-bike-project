import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from './components/mainpage/header/custom.datepipe';
import { AppRoutingModule ,} from './app-routing-module';
import { HomeComponent } from './components/mainpage/home/home.component';
import { Overview1componentComponent } from './components/scooters/overview1component/overview1component.component';
import { Overview2componentComponent } from './components/scooters/overview2component/overview2component.component';
import { Detail2Component } from './components/scooters/detail2/detail2.component';
import { Overview3Component } from './components/scooters/overview3component/overview3.component';
import { Detail3Component } from './components/scooters/detail3/detail3.component';
import {ScootersService} from './services/scooters.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Overview1componentComponent,
    NavBarComponent,
    CustomDatePipe,
    Overview2componentComponent,
    Detail2Component,
    Overview3Component,
    Detail3Component,
    // AutoFocusDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [ScootersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
