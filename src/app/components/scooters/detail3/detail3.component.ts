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


@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css'],
})


export class Detail3Component implements OnInit, OnChanges {

  //by emitting true for overview3 component
  // which takes care of removing the selection focus from the selected scooter
  @Output() cancelledEditing: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('editedScooterId')
  public editedScooterId: number;
  public noChange:boolean;
  public cancelledDialog = false;
  public showDialog = false;
  public statusesArray = this.statusScooter(ScooterStatus);
  public allStatuses = ScooterStatus;
  public deletedScooter;
  public editedScooter: Scooter;

  @Input("newClickedScooter")
  public newClickedScooter:boolean;
  //Input elements
  @ViewChild('gpsLocationInput') gpsLocationInput: ElementRef;
  @ViewChild('statusInput') statusInput: ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef;
  @ViewChild('mileageInput') mileageInput: ElementRef;
  @ViewChild('batteryChargeInput') batteryChargeInput: ElementRef;

  constructor(private scooterService: ScootersService) {
  }



  ngOnInit(): void {

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
    //Add or update
    this.scooterService.save(newEditedScooter);
    this.cancelledDialog = true;
  }

  /**
   * To reset all input fields to the origin values of the scooter
   */
  public reset(resetDirectly:boolean): void {
    if (resetDirectly){
      this.tagInput.nativeElement.value = this.editedScooter.tag;
      this.gpsLocationInput.nativeElement.value = this.editedScooter.gpsLocation;
      this.mileageInput.nativeElement.value = this.editedScooter.setMileage;
      this.batteryChargeInput.nativeElement.value = this.editedScooter.batteryCharge;
      this.statusInput.nativeElement.value = this.editedScooter.status;
      this.cancelledDialog = true;
    }else if(!this.checkChanges()) {
      this.cancelledDialog = false;
    }
  }

  /**
   * To clear the fields
   */
  clear(): void {
    if (!this.checkChanges()) {
      this.cancelledDialog = false;
    }else {
      this.tagInput.nativeElement.value = '';
      this.gpsLocationInput.nativeElement.value = '';
      this.mileageInput.nativeElement.value = '';
      this.batteryChargeInput.nativeElement.value = '';
      this.statusInput.nativeElement.value = '';
      this.cancelledDialog = true;
    }
  }

  /**
   * Cancel changes, but before canceling it check if the user wants to save the changes
   */
  cancel(): void {
    if (!this.checkChanges()) {
      this.cancelledDialog = false;
    } else {
      this.editedScooterId = -1;
      //Emit true, the editing has been cancelled
      this.cancelledEditing.emit(true);
      this.cancelledDialog = true;
    }
  }

  /**
   * Check if the scooter the ones being edited equal to the one in the server
   */
  public checkChanges(): boolean {
    if (this.editedScooterId > -1) {
      let newEditedScooter = this.getInputFieldsValues();
      this.showDialog = !this.compare(newEditedScooter, this.editedScooter);
      this.cancelledDialog = false;
      return !this.showDialog;
    } else {
      this.cancelledDialog = true;
      return false;
    }
  }

  public checkValues():boolean{
    let newScooter  = this.getInputFieldsValues();
    return this.noChange = !this.compare(this.editedScooter, newScooter);


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

  /**
   * To compare the values of the scooter
   * @param scooter1
   * @param scooter2
   * @private
   */
  public compare(scooter1: Scooter, scooter2: Scooter): boolean {
    return scooter1.tag == scooter2.tag &&
      scooter1.status == scooter2.status &&
      scooter1.gpsLocation == scooter2.gpsLocation &&
      scooter1.setMileage == scooter2.setMileage &&
      scooter1.batteryCharge == scooter2.batteryCharge;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.newClickedScooter){
      setInterval(()=>{
        this.checkValues()
      },1000)
    }
  }
}
