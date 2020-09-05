import { Component, OnInit } from '@angular/core';
import data from '../../../../assets/data/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  imagesArray: {image: String}[] = data;
  constructor() { }

  ngOnInit(): void {
  }

}
