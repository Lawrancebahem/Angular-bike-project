import { Component, OnInit } from '@angular/core';
import data from '../../../../assets/data/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  public imagesArray: {image: String}[] = data;
  public cities:String[] = ['Amsterdam','Amstelveen', 'Haarlem'];
  public chosenCity;

  constructor() {
    this.chosenCity = this.cities[0];
  }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
  }
}
