import { Component, OnInit } from '@angular/core';
import {Scooter} from '../../../models/scooter';
import {ScootersService} from '../../../services/scooters.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ScooterSbServiceService} from '../../../services/scooter-sb-service.service';

@Component({
  selector: 'app-overview5',
  templateUrl: './overview5.component.html',
  styleUrls: ['./overview5.component.css']
})
export class Overview5Component implements OnInit {

  public selectedScooter: Scooter;
  public newClickedScooterId;
  public cancelButtonIsClicked: boolean;
  public defaultScooter: Scooter = Scooter.createRandomScooter();
  public selectedScooterId;
  constructor(public scooterSbService: ScooterSbServiceService,
              protected router: Router,
              protected activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.firstChild.params.subscribe((params:Params)=>{
      this.selectedScooterId = Number(params['id']);
    })
  }

  /**
   * Get the the click scooter, and set teh this.clicked to true (for styling the last added element)
   * @param scooter
   */
  public getClickedScooter(scooter: Scooter) {
    this.selectedScooterId = scooter.id;
    this.router.navigate([scooter.id], {relativeTo:this.activeRoute})
  }

  /**
   * To add random scooters
   * @private
   */
  public addRandomScooters(): void {
    this.scooterSbService.save(Scooter.createRandomScooter());
  }

  /**
   * Set the focus on the last added scooter
   */
  public addRandomWithFocusSelection() {
    this.selectedScooter = Scooter.createRandomScooter();
    this.router.navigate([this.selectedScooter.id],{relativeTo:this.activeRoute});
    this.scooterSbService.save(this.selectedScooter);
  }

  public getScooters(): Scooter[] {
    return this.scooterSbService.findAll();
  }

}
