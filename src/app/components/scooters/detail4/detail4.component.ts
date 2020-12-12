import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Scooter, ScooterStatus} from '../../../models/scooter';
import {ScootersService} from '../../../services/scooters.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CanDeactivateComponent} from '../../../guards/can-deactivate-component';

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnDestroy, CanDeactivateComponent {

  public hasChanged: boolean;
  public selectedScooterId;
  public statusesArray = this.statusScooter(ScooterStatus);
  public allStatuses = ScooterStatus;
  public deletedScooter;
  public editedScooter: Scooter;
  private CONFIRM_MESSAGE = 'You have unsaved changes. Do you want to proceed?';
  public paramsSubscription: Subscription;

  //Input elements
  @ViewChild('gpsLocationInput') gpsLocationInput: ElementRef;
  @ViewChild('statusInput') statusInput: ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef;
  @ViewChild('mileageInput') mileageInput: ElementRef;
  @ViewChild('batteryChargeInput') batteryChargeInput: ElementRef;

  constructor(public scooterService: ScootersService,
              public route: Router,
              public activeRouter: ActivatedRoute) {}

  canDeactivate(): boolean {
    return this.hasChanged;
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activeRouter.params.subscribe((params: Params) => {
      this.hasChanged = false;
      this.selectedScooterId = Number(params['id']);
      let foundScooter = this.getScooterById();

      //if foundScooter is null and de param is not -1, that means that the use has entered a wrong url
      //we need to navigate to a wrong url purposely to get the 404 page
      if (foundScooter == null && params['id'] != -1){
        this.route.navigate([params['id']])
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
      this.deletedScooter = this.scooterService.deleteById(id);
      return this.deletedScooter;
    }
  }

  /**
   * Get a scooter by its id
   */
  public getScooterById(): Scooter {
    return this.editedScooter = this.scooterService.findById(this.selectedScooterId);
  }

  /**
   * Save or update a scooter
   */
  public saveOrUpdate(): void {
    let newEditedScooter = this.getInputFieldsValues();
    //Add or update
    this.scooterService.save(newEditedScooter);
    this.hasChanged = false;
  }

  /**
   * To reset all input fields to the origin values of the scooter
   */
  public reset(): void {
    const confirmChanges = confirm(this.CONFIRM_MESSAGE);
    if (this.hasChanged && confirmChanges) {
      this.tagInput.nativeElement.value = this.editedScooter.tag;
      this.gpsLocationInput.nativeElement.value = this.editedScooter.gpsLocation;
      this.mileageInput.nativeElement.value = this.editedScooter.getMileage;
      this.batteryChargeInput.nativeElement.value = this.editedScooter.batteryCharge;
      this.statusInput.nativeElement.value = this.editedScooter.status;
      this.hasChanged = false;
    }
  }

  /**
   * To clear all fields
   */
  clear(): void {
    const confirmChanges = this.hasChanged ? confirm(this.CONFIRM_MESSAGE) : confirm('Are you sure you want to clear all fields?');
    if (confirmChanges) {
      this.tagInput.nativeElement.value = '';
      this.gpsLocationInput.nativeElement.value = '';
      this.mileageInput.nativeElement.value = '';
      this.batteryChargeInput.nativeElement.value = '';
      this.statusInput.nativeElement.value = '';
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
        this.route.navigate(["overview4"])
      }
    } else {
      this.selectedScooterId = -1;
      this.route.navigate(["overview4"])
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
    if (this.selectedScooterId != null) {
      let tag = this.tagInput.nativeElement.value;
      let gpsLocation = this.gpsLocationInput.nativeElement.value;
      let mileage = this.mileageInput.nativeElement.value;
      let batteryCharge = this.batteryChargeInput.nativeElement.value;
      let status = this.statusInput.nativeElement.value;
      return new Scooter(this.selectedScooterId, tag, status, gpsLocation, mileage, batteryCharge);
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
          return false;
        }
      }
      // If we made it this far, objects
      // are considered equivalent
      return true;
    }
  }
}
