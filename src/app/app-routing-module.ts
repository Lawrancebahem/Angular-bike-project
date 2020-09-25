import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1componentComponent} from './components/scooters/overview1component/overview1component.component';
import {Overview2componentComponent} from "./components/scooters/overview2component/overview2component.component";
import {Overview3Component} from './components/scooters/overview3component/overview3.component';
import {ErrorComponent} from "./components/error-component/error-component.component";

const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'overview1', component: Overview1componentComponent},
  {path: 'overview2', component: Overview2componentComponent},
  {path: 'overview3', component: Overview3Component},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

