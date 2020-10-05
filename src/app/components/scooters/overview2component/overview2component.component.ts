import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Scooter} from '../../../models/scooter';

@Component({
  selector: 'app-overview2component',
  templateUrl: './overview2component.component.html',
  styleUrls: ['./overview2component.component.css'],
})

export class Overview2componentComponent implements OnInit {
  public scooters: Scooter[];
  public selectedScooter: Scooter;
  public focusLastElement;
  public clicked = false;


  constructor() {
  }


  ngOnInit(): void {
    this.scooters = [];
    for (let i = 0; i < 8; i++) {
      this.addRandomScooters();
    }
  }

  /**
   * Get the the click scooter, and set teh this.clicked to ture (for styling the last added element)
   * @param value
   */
  public getClickedScooter(value: Scooter) {
    this.clicked = true;
    return this.selectedScooter = value;
  }

  /**
   * Return the selected scooter
   */
  public getSelectedScooter(): Scooter {
    return this.selectedScooter;
  }

  /**
   * To add random scooters
   * @private
   */
  public addRandomScooters(): void {
    this.scooters.push(Scooter.createRandomScooter());
  }

  public deleteScooter(scooter){
    this.scooters.splice(this.scooters.indexOf(scooter), 1);
  }
  /**
   * Set the focus on the last added scooter
   */
  public addRandomWithFocusSelection() {
    this.selectedScooter = Scooter.createRandomScooter();
    this.focusLastElement = this.selectedScooter.id;
    this.clicked = false;
    this.scooters.push(this.selectedScooter);
  }
}
