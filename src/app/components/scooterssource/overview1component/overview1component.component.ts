import { Component, OnInit } from '@angular/core';
import {Scooter} from '../../../models/scooter';

@Component({
  selector: 'app-overview1component',
  templateUrl: './overview1component.component.html',
  styleUrls: ['./overview1component.component.css']
})
export class Overview1componentComponent implements OnInit {
  //Test Amsterdam location
  // const GPS = Scooter.randomGeo(52.377956,	4.897070);
  scooters:Scooter[];
  constructor() { }

  ngOnInit(): void {
    this.scooters = [];
    for (let i = 0;i<8; i++){
      this.addRandomScooters();
      console.log(this.scooters[i]);
    }
  }

  /**
   * To add random scooters
   * @private
   */
  public addRandomScooters():void{
    this.scooters.push(Scooter.createRandomScooter());
  }
}
