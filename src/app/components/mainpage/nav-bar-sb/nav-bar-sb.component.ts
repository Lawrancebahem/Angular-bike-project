import {Component, HostListener, OnInit} from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";
import {CanDeactivateComponent} from "../../../guards/can-deactivate-component";

@Component({
  selector: 'app-nav-bar-sb',
  templateUrl: './nav-bar-sb.component.html',
  styleUrls: ['./nav-bar-sb.component.css']
})
export class NavBarSbComponent implements OnInit {


  constructor(public sessionService:SessionSbService) { }

  ngOnInit(): void {
    this.sessionService.getTokenFromSessionStorage();
  }


  public signOff(){
    this.sessionService.signOut();
  }
}
