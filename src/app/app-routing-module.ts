import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1componentComponent} from './components/scooterssource/overview1component/overview1component.component';

const routes: Routes = [
   {path:'Home', component: HomeComponent},
   {path:'Scooters', component: Overview1componentComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

