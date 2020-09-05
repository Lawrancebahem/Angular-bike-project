import { Component, OnInit } from '@angular/core';
import data from './data/data.json';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoImage: any = '../../assets/images/Logo.png';
  eScooterLogo: any = '../../assets/images/e-scooter.png';

  constructor() { }

  ngOnInit(): void {
  }

}
