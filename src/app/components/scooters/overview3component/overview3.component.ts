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
  public selectedScooterId;
  public cancelledEditing:boolean = false;
  public newClickedScooter = false;
  constructor(private scooterService:ScootersService) {
  }

  ngOnInit(): void {

  }

  /**
   * Get the the click scooter, and set teh this.clicked to ture (for styling the last added element)
   * @param value
   */
  public getClickedScooter(value: Scooter):Scooter {
    this.newClickedScooter = true;
    this.selectedScooterId = value.id;
    return this.selectedScooter = value;

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
    this.cancelledEditing = false;
    this.scooterService.save(this.selectedScooter);
  }

  public getScooters():Scooter[]{
    return this.scooterService.findAll();
  }

  public getCancelled(event:boolean){
    this.cancelledEditing = event;
  }
}
