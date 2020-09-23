import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  public selectedScooterId;
  public cancelButtonIsClicked:boolean;

  constructor(public scooterService:ScootersService) {
  }

  ngOnInit(): void {

  }

  /**
   * Get the the click scooter, and set teh this.clicked to true (for styling the last added element)
   * @param value
   */
  public getClickedScooter(value: Scooter) {
    return this.selectedScooterId = value.id;
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
    this.selectedScooterId = this.selectedScooter.id;
    this.scooterService.save(this.selectedScooter);
  }

  public getScooters():Scooter[]{
    return this.scooterService.findAll();
  }
}
