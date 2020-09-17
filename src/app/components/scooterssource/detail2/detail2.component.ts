import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScooterStatus} from "../../../models/scooter";


@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input("scooter")
  public selectedScooter:Scooter;
  public statusesArray = this.statusScooter(ScooterStatus);
  public allStatuses = ScooterStatus;
  public deletedScooter;
  @Output()outputEvent :EventEmitter<Scooter> = new EventEmitter<Scooter>();

  constructor() {
  }

  /**
   * Emit the scooter to be deleted
   * @param toDeleteScooter
   */
  public emitScooter(toDeleteScooter:Scooter){
    this.deletedScooter = toDeleteScooter;
    this.outputEvent.emit(toDeleteScooter);
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
