import {Component, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScooterStatus} from "../../../models/scooter";

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input("scooter")
  public _selectedScooter:Scooter;
  public _scooterStatus = this.statusScooter(ScooterStatus);
  public convertedStatus = ScooterStatus;

  constructor() {
  }

  ngOnInit(): void {
  }

  public getScooterData(value: Scooter){
    let array = [];
    for (const property in value) {
      let label = property.replace('_', '').charAt(0).toUpperCase() + property.slice(2);
      array.push(
        {
          name: label,
          value: value[property]
        }
      );
    }
    return array;
  }

  private statusScooter<T>(enumOb: T): T[keyof T][] {
    const enumValues = Object.keys(enumOb)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
    return enumValues;
  }

}
