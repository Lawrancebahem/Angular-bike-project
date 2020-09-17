import { Component, OnInit } from '@angular/core';
import {Scooter} from '../../../models/scooter';

@Component({
  selector: 'app-overview2component',
  templateUrl: './overview2component.component.html',
  styleUrls: ['./overview2component.component.css']
})
export class Overview2componentComponent implements OnInit {
  scooters:Scooter[];
  private _selectedScooter:Scooter;
  constructor() { }

  ngOnInit(): void {
    this.scooters = [];
    for (let i = 0;i<8; i++){
      this.addRandomScooters();
    }
  }

  public getScooterByTag(value: Scooter){
    return this._selectedScooter = value;
  }

  public selectedScooter(): Scooter {
    return this._selectedScooter;
  }

  /**
   * To add random scooters
   * @private
   */
  public addRandomScooters():void{
    this.scooters.push(Scooter.createRandomScooter());
  }



}
