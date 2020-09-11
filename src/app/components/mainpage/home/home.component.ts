import { Component, OnInit } from '@angular/core';
import data from '../../../../assets/data/data.json';
import {arrayify} from 'tslint/lib/utils';
import {Scooter} from '../../../models/scooter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imagesArray: {image: String}[] = data;
  public cities: String[] = ['Amsterdam', 'Amstelveen', 'Haarlem'];
  public arrayOfPlaces: any[] = [];
  public places: any[] =
    [{city: 'Amsterdam', place: ['Leidsplein', 'Centraal', 'De Dam'], },
      {city: 'Amstelveen', place: ['Delf landlaan plein', 'Handbalstraat']},
      {city: 'Haarlem', place: ['Jan straat', 'Wester park']}];
  public chosenCity;
  private scooter: Scooter;

  constructor() {
    this.chosenCity = this.cities[0];
  }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
  }

  /**
   * To get the places of the chosen city
   * @param clickedCity
   */
  // tslint:disable-next-line:ban-types typedef
  getPlace(clickedCity: String){
    this.arrayOfPlaces = [];
    this.places.forEach((value, x) => {
      if (value.city === clickedCity){
        value.place.forEach((place, p) => {
          this.arrayOfPlaces.push(place);
        });
      }
    });
    return this.arrayOfPlaces;
  }
}




enum ScooterStatus {
  IDLE,
  INUSE,
  MAINTENANCE,
}
