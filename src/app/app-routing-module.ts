import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1componentComponent} from './components/scooterssource/overview1component/overview1component.component';
import {Overview2componentComponent} from "./components/scooterssource/overview2component/overview2component.component";

const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'Scooter1', component: Overview1componentComponent},
  {path: 'Scooter2', component: Overview2componentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

