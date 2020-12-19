import { Component, OnInit } from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {ScooterSbServiceService} from "../../../services/scooter-sb-service.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-overview51',
  templateUrl: './overview51.component.html',
  styleUrls: ['./overview51.component.css']
})
export class Overview51Component implements OnInit {

  public selectedScooter: Scooter;
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
    this.scooterSbService.save(Scooter.createRandomScooter()).subscribe((response)=>{
      console.log(response);
    },error => {
      console.log(error);
    });
  }

  /**
   * Set the focus on the last added scooter
   */
  public addRandomWithFocusSelection() {
    this.selectedScooter = Scooter.createRandomScooter();
    this.selectedScooter.id = 0;
    const scooterStatus:any = ScooterStatus[this.selectedScooter.status];
    this.selectedScooter.status = scooterStatus;
    this.router.navigate([this.selectedScooter.id],{relativeTo:this.activeRoute});
    this.scooterSbService.save(this.selectedScooter).subscribe((response)=>{
      console.log(response);
    },error => {
      console.log(error);
    });
  }

  public getScooters(): Scooter[] {
    return this.scooterSbService.findAll();
  }

}
