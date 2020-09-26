import { Component, OnInit } from '@angular/core';
import {Overview4Component} from '../overview4component/overview4component.component';
import {Scooter} from '../../../models/scooter';

@Component({
  // selector: 'app-overview4qp',
  templateUrl: '../overview4component/overview4component.component.html',
})
export class Overview4qpComponent extends Overview4Component {


  ngOnInit(): void {
  }

  getClickedScooter(scooter: Scooter) {
    this.selectedScooterId = scooter.id;
    this.router.navigate(["edit"], {relativeTo:this.activeRoute, queryParams:{id:scooter.id}})
  }
}
