import {
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Scooter, ScooterStatus} from '../../../models/scooter';
import {ScootersService} from '../../../services/scooters.service';
import has = Reflect.has;


@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css'],
})


export class Detail3Component implements OnInit, OnChanges {

  //by emitting true for overview3 component
  // which takes care of removing the selection focus from the selected scooter

  // ngOnChanges(changes: SimpleChanges): void {
    //   if (this.newClickedScooter){
    //     setInterval(()=>{
    //       this.checkValues()
    //     },1000)
    //   }
    // }

  @Input('editedScooterId')
  public editedScooterId: number;
  public hasChanged:boolean;
  @Input('showPanel')
  public showPanel:boolean;
  public showPanel2:boolean;
  public cancelledDialog = false;
  public showDialog = false;
  public statusesArray = this.statusScooter(ScooterStatus);
  public allStatuses = ScooterStatus;
  public deletedScooter;
  public editedScooter: Scooter;

  @Input('newClickedScooterId')
  public newClickedScooter:Scooter;
  //Input elements
  @ViewChild('gpsLocationInput') gpsLocationInput: ElementRef;
  @ViewChild('statusInput') statusInput: ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef;
  @ViewChild('mileageInput') mileageInput: ElementRef;
  @ViewChild('batteryChargeInput') batteryChargeInput: ElementRef;

  constructor(private scooterService: ScootersService) {}


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showPanel2 = this.showPanel;
    console.log(this.showPanel2);
  }

  /**
   * Delete a scooter using its id
   * @param id
   */
  public deleteScooter(id: number) {
    this.deletedScooter = this.scooterService.deleteById(id);
    this.editedScooterId = -1;
    return this.deletedScooter;
  }

  /**
   * Get a scooter by its id
   */
  public getScooterById(): Scooter {
    return this.editedScooter = this.scooterService.findById(this.editedScooterId);

  }

  /**
   * Save or update a scooter
   */
  public saveOrUpdate(): void {
    //Return new scooter with the new input values
    let newEditedScooter = this.getInputFieldsValues();
    this.editedScooter = this.getInputFieldsValues();
    //Add or update
    this.scooterService.save(newEditedScooter);
    this.cancelledDialog = true;
    this.hasChanged = false;
  }

  /**
   * To reset all input fields to the origin values of the scooter
   */
  public reset(isOpen?:boolean): void {
    if(this.hasChanged){
      this.showDialog = true;
      if(isOpen){
        this.showDialog = false;
        this.tagInput.nativeElement.value = this.editedScooter.tag;
        this.gpsLocationInput.nativeElement.value = this.editedScooter.gpsLocation;
        this.mileageInput.nativeElement.value = this.editedScooter.setMileage;
        this.batteryChargeInput.nativeElement.value = this.editedScooter.batteryCharge;
        this.statusInput.nativeElement.value = this.editedScooter.status;
      }
    }
  }

  /**
   * To clear the fields
   */
  clear(): void {
    if (!this.compareScooter(this.getInputFieldsValues(), this.editedScooter)) {
      this.showDialog = true;
    }else {
      this.tagInput.nativeElement.value = '';
      this.gpsLocationInput.nativeElement.value = '';
      this.mileageInput.nativeElement.value = '';
      this.batteryChargeInput.nativeElement.value = '';
      this.statusInput.nativeElement.value = '';
      this.showDialog = false;
    }
  }

  /**
   * Cancel changes, but before canceling it check if the user wants to save the changes
   */
  cancel(): void {
    if (this.hasChanged) {
      this.showDialog = true;
    } else {
      this.showDialog = false;
      this.showPanel2 = false;
    }
  }

  public checkValues():boolean{
    return this.hasChanged = !this.compareScooter(this.editedScooter, this.getInputFieldsValues());
  }
  /**
   * Return a new edited scooter based on the new values
   * @private
   */
  private getInputFieldsValues(): Scooter {
    if (this.editedScooterId != -1) {
      let tag = this.tagInput.nativeElement.value;
      let gpsLocation = this.gpsLocationInput.nativeElement.value;
      let mileage = this.mileageInput.nativeElement.value;
      let batteryCharge = this.batteryChargeInput.nativeElement.value;
      let status = this.statusInput.nativeElement.value;
      return new Scooter(this.editedScooterId, tag, status, gpsLocation, mileage, batteryCharge);
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

  // /**
  //  * To compare the values of the scooter
  //  * @param scooter1
  //  * @param scooter2
  //  * @private
  //  */
  // public compare(scooter1: Scooter, scooter2: Scooter): boolean {
  //   if(scooter1 != null && scooter2 != null){
  //     return scooter1 == scooter2;
  //   }
  //   return false;
  // }

  /**
   * To compare with values of the scooter
   * @param scooter1
   * @param scooter2
   */
  public compareScooter(scooter1: Scooter, scooter2: Scooter): boolean{
    if(scooter1 != null && scooter2 != null){
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
