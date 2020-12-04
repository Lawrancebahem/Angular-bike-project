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
import { ScootersService } from './services/scooters.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/mainpage/error-component/error-component.component';
import { Overview4Component } from './components/scooters/overview4component/overview4component.component';
import { Detail4Component } from './components/scooters/detail4/detail4.component';
import {PendingChangesGuard} from './gurads/can-deactivate-component';
import { Overview4qpComponent } from './components/scooters/overview4qp/overview4qp.component';
import {Detail4qpComponent} from './components/scooters/detail4qp/detail4qp.component';
import { Overview5Component } from './components/scooters/overview5/overview5.component';
import { Detail5Component } from './components/scooters/detail5/detail5.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HeaderSbComponent } from './components/mainpage/header-sb/header-sb.component';
import { LoginComponent } from './components/mainpage/login/login.component';
import { NavBarSbComponent } from './components/mainpage/nav-bar-sb/nav-bar-sb.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";



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
    ErrorComponent,
    Overview4Component,
    Detail4Component,
    Overview4qpComponent,
    Detail4qpComponent,
    Overview5Component,
    Detail5Component,
    HeaderSbComponent,
    LoginComponent,
    NavBarSbComponent
    // AutoFocusDirective
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [ScootersService ,
    PendingChangesGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
