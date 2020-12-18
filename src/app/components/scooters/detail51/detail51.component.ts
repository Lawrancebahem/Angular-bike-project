import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Scooter, ScooterStatus} from '../../../models/scooter';
import {Subscription} from 'rxjs';
import {ScooterSbServiceService} from '../../../services/scooter-sb-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail51',
  templateUrl: './detail51.component.html',
  styleUrls: ['./detail51.component.css']
})
export class Detail51Component implements OnInit {

  @ViewChild('formElement',{static:false})
  public detailForm:NgForm;


  public hasChanged: boolean;
  public selectedScooterId = 0;
  public statusesArray = this.statusScooter(ScooterStatus);
  public allStatuses = ScooterStatus;
  public deletedScooter;
  public editedScooter: Scooter;
  private CONFIRM_MESSAGE = 'You have unsaved changes. Do you want to proceed?';
  public paramsSubscription: Subscription;



  constructor(public scooterSbServiceService: ScooterSbServiceService,
              public route: Router,
              public activeRouter: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.paramsSubscription = this.activeRouter.params.subscribe((params: Params) => {
      this.hasChanged = false;
      this.selectedScooterId = Number(params['id']);
      if (this.selectedScooterId > -1){
        this.getScooterById();
      }
    });

  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }

  /**
   * Delete a scooter using its id
   * @param id
   */
  public deleteScooter(id: number) {
    const confirmChanges = confirm(this.CONFIRM_MESSAGE);
    if (confirmChanges) {
      this.deletedScooter = this.scooterSbServiceService.deleteById(id);
      return this.deletedScooter;
    }
  }


  /**
   * Get a scooter by its id
   */
  public getScooterById(){
    this.scooterSbServiceService.findById(this.selectedScooterId).subscribe((scooter)=>{
      this.editedScooter = Scooter.trueCopy(scooter);

    },error => {
      console.log(error.error.message)
      this.editedScooter = null;
      this.selectedScooterId = null;
    })
  }

  /**
   * Save or update a scooter
   */
  public saveOrUpdate(): void {
    let newEditedScooter = this.getInputFieldsValues();
    //Add or update
    this.scooterSbServiceService.save(newEditedScooter).subscribe((response) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
    this.hasChanged = false;
  }

  /**
   * To reset all input fields to the origin values of the scooter
   */
  public reset(): void {
    const confirmChanges = confirm(this.CONFIRM_MESSAGE);
    if (confirmChanges) {
      this.scooterSbServiceService.findById(this.selectedScooterId).subscribe((response)=>{
        const scooter:Scooter  = Scooter.trueCopy(response);
        this.editedScooter.tag = scooter.tag;
        this.editedScooter.status = scooter.status;
        this.editedScooter.gpsLocation = scooter.gpsLocation;
        this.editedScooter.id = scooter.id;
        this.editedScooter.batteryCharge = scooter.batteryCharge;
        this.editedScooter.getMileage = scooter.getMileage;
      })

    }
  }

  /**
   * To clear all fields
   */
  clear(): void {
    const confirmChanges = this.hasChanged ? confirm(this.CONFIRM_MESSAGE) : confirm('Are you sure you want to clear all fields?');
    if (confirmChanges) {

      this.detailForm.controls['tag'].setValue('')
      this.detailForm.controls['status'].setValue('');
      this.detailForm.controls['gpsLocation'].setValue('');
      this.detailForm.controls['gpsLocation'].setValue('');
      this.detailForm.controls['mileage'].setValue('');
      this.detailForm.controls['batteryCharge'].setValue('');
    }
  }

  /**
   * Cancel changes, but before canceling it check if the user wants to save the changes
   */
  cancel(): void {
    if (this.hasChanged) {
      let confirmChanges = confirm(this.CONFIRM_MESSAGE);
      if (confirmChanges) {
        this.selectedScooterId = -1;
        this.route.navigate(['overview5']);
      }
    } else {
      this.selectedScooterId = -1;
      this.route.navigate(['overview5']);
    }
  }

  public checkValues(): boolean {
    this.hasChanged = !this.compareScooter(this.editedScooter, this.getInputFieldsValues());
    return this.hasChanged;
  }

  /**
   * Return a new edited scooter based on the new values
   * @private
   */
  private getInputFieldsValues(): Scooter {
    const scooter:Scooter = {id:0,...this.detailForm.value};
    if (this.selectedScooterId != null) {
      scooter.id = this.selectedScooterId;
      scooter.status = this.statusesArray[scooter.status];
      return scooter;
    }
  }
  /**
   * Return a generic type enum
   * @param enumOb
   * @private
   */
  private statusScooter<T>(enumOb: T): T[keyof T][] {
    return Object.keys(enumOb)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
  }

  /**
   * To compare with values of the scooter
   * @param scooter1
   * @param scooter2
   */
  public compareScooter(scooter1: Scooter, scooter2: Scooter): boolean {
    if (scooter1 != null && scooter2 != null) {
      // Create arrays of property names
      const props = Object.getOwnPropertyNames(scooter1);

      for (let i = 0; i < props.length; i++) {
        let propName = props[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (scooter1[propName] !== scooter2[propName]) {
          console.log('Not equal')
          return false;
        }
      }
      // If we made it this far, objects
      // are considered equivalent
      return true;
    }
  }

}
