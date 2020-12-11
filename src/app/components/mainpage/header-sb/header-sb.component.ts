import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";

@Component({
  selector: 'app-header-sb',
  templateUrl: './header-sb.component.html',
  styleUrls: ['./header-sb.component.css']
})
export class HeaderSbComponent implements OnInit {

  logoImage: any = '../../assets/images/Logo.png';
  eScooterLogo: any = '../../assets/images/e-scooter.png';
  // @ts-ignore
  todayDate =  Date.now();
  constructor(public sessionService:SessionSbService) {
  }

  ngOnInit(): void {
  }

}
