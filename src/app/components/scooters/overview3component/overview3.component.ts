import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Scooter} from '../../../models/scooter';
import {ScootersService} from '../../../services/scooters.service';

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css'],
})
export class Overview3Component implements OnInit {

  public selectedScooter: Scooter;
  public newClickedScooterId;
  public cancelButtonIsClicked: boolean;
  public defaultScooter: Scooter = Scooter.createRandomScooter();

  constructor(public scooterService: ScootersService) {
  }

  ngOnInit(): void {
  }

  /**
   * Get the the click scooter, and set teh this.clicked to true (for styling the last added element)
   * @param value
   */
  public getClickedScooter(value: Scooter) {
    this.scooterService.previousSelected = this.scooterService.selectedScooter;
    return this.scooterService.selectedScooter = value.id;
  }

  /**
   * To add random scooters
   * @private
   */
  public addRandomScooters(): void {
    this.scooterService.save(Scooter.createRandomScooter());
  }

  /**
   * Set the focus on the last added scooter
   */
  public addRandomWithFocusSelection() {
    this.selectedScooter = Scooter.createRandomScooter();
    this.scooterService.selectedScooter = this.selectedScooter.id;
    this.scooterService.save(this.selectedScooter);
  }

  public getScooters(): Scooter[] {
    return this.scooterService.findAll();
  }
}
