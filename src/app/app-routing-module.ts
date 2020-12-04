import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1componentComponent} from './components/scooters/overview1component/overview1component.component';
import {Overview2componentComponent} from './components/scooters/overview2component/overview2component.component';
import {Overview3Component} from './components/scooters/overview3component/overview3.component';
import {ErrorComponent} from './components/mainpage/error-component/error-component.component';
import {Overview4Component} from './components/scooters/overview4component/overview4component.component';
import {Detail4Component} from './components/scooters/detail4/detail4.component';
import {Detail41Component} from './components/scooters/detail41/detail41.component';
import {PendingChangesGuard} from './gurads/can-deactivate-component';
import {Detail4qpComponent} from './components/scooters/detail4qp/detail4qp.component';
import {Overview4qpComponent} from './components/scooters/overview4qp/overview4qp.component';
import {Overview5Component} from './components/scooters/overview5/overview5.component';
import {Detail5Component} from './components/scooters/detail5/detail5.component';
import {LoginComponent} from "./components/mainpage/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'overview1', component: Overview1componentComponent},
  {path: 'overview2', component: Overview2componentComponent},
  {path: 'overview3', component: Overview3Component},
  {path: 'overview4', component: Overview4Component,
    children: [
      {path: ':id', component: Detail4Component},
      {path: '',redirectTo: '-1', pathMatch: 'full'},
    ]
  },
  {path: 'overview41', component: Overview4Component,
    children: [
      {path: ':id', component: Detail41Component, canDeactivate:[PendingChangesGuard]},
      {path: '',redirectTo: '-1', pathMatch: 'full'},
    ]
  },
  {path: 'overview4qp', component: Overview4qpComponent,
    children: [
      {path: 'edit', component: Detail4qpComponent,
        children: [
          {path: '?id=:', component: Detail4qpComponent},
          {path: '',redirectTo: '-1', pathMatch: 'full'},
        ]
      },
    ]
  },
  {path: 'overview5', component: Overview5Component,
    children: [
      {path: ':id', component: Detail5Component},
      {path: '',redirectTo: '-1', pathMatch: 'full'},
    ]
  },

  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

