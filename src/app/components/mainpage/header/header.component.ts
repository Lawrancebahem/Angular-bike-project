import {Component, OnInit} from '@angular/core';
import {CustomDatePipe} from './custom.datepipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoImage: any = '../../assets/images/Logo.png';
  eScooterLogo: any = '../../assets/images/e-scooter.png';
  // @ts-ignore
  todayDate =  Date.now();
  constructor() {
  }

  ngOnInit(): void {
  }

}
