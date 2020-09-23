/**
 * Enumeration for the scooter status
 */
// enum ScooterStatus {
//   IDLE = "Idle",
//   IN_USE = "In use",
//   MAINTENANCE = "Maintenance",
// }

export enum ScooterStatus {
  IDLE,
  IN_USE,
  MAINTENANCE
}

/**
 * Scooter class
 * @author Lawrance Bahem
 */
export class Scooter {
  private static _startingCode = 30001;
  private static _distanceLimit =  5000; // in meters
  private static _AmsterdamLocation = { latitude: 52.377956, longitude: 4.897070 };

  private _id: number;
  private _tag: String;
  private _status: ScooterStatus;
  private _gpsLocation: string;
  private _batteryCharge: number;
  private _setMileage: number;

  constructor(_id: number, _tag: String, _status: ScooterStatus, _gpsLocation: string, _mileage: number, _batteryCharge: number) {
    this._setMileage = _mileage;
    this._batteryCharge = _batteryCharge;
    this._gpsLocation = _gpsLocation;
    this._status = _status;
    this._tag = _tag;
    this._id = _id;
    this._tag = _tag;
    this._status = _status;
  }

  /**
   * Create a random scooter with random information
   */
  public static createRandomScooter(){
    const randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const randomId = this._startingCode++;
    const randomTag = this.generateRandomTag(8, randomString);
    const randomStatus = this.getRandomStatus(ScooterStatus);
    const randomGPS = this.randomGeo(this._AmsterdamLocation.latitude,	this._AmsterdamLocation.longitude);
    const randomLocation = randomGPS.latitude + ',' + randomGPS.longitude;
    const randomMileage = randomGPS.distance;
    const batteryCharge = this.generateRandomPercentage();

    return new Scooter(randomId,randomTag, randomStatus, randomLocation, parseInt(randomMileage),batteryCharge);
  }

  /**
   * To generate random tag that consists of a certain length
   * @param lengthOfCode
   * @param possible
   * @private
   */
  private static generateRandomTag(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /**
   * Generic method that returns a typesafe random enum.
   * @param enumOb
   * @private
   */
  private static getRandomStatus<T>(enumOb: T): T[keyof T] {
    const enumValues = Object.keys(enumOb)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

  /**
   * Generate random latitude, longitude. Based on a latitude and longitude
   * @param latitude
   * @param longitude
   * @private
   */
  private static randomGeo(latitude, longitude){
    const y0 = latitude;
    const x0 = longitude;
    const rd = this._distanceLimit / 111300; // about 111300 meters in one degree

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const newLatitude = y + y0;
    const newLongitude = x + x0;
    const newDistance = this.distance(latitude, longitude, newLatitude, newLongitude).toFixed(2);
    return  {latitude : newLatitude, longitude: newLongitude, distance:newDistance};
  }

  /**
   * To calculate the distance between to coordinates
   * @param lat1 current
   * @param lon1 current
   * @param lat2 nearby
   * @param lon2 nearby
   * @private
   */
  private static distance(lat1, lon1, lat2, lon2):number{
    const R = 6371000;
    // tslint:disable-next-line:max-line-length
    const a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180)
      * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
    return Math.round(R * 2 * Math.asin(Math.sqrt(a)));
  }

  /**
   * To generate random number between 5-100
   * @private
   */
  private static generateRandomPercentage(): number{
    return Math.floor(5 + Math.random()*(100 + 1 - 5))
  }


  static get startingCode(): number {
    return this._startingCode;
  }


  static get distanceLimit(): number {
    return this._distanceLimit;
  }

  static set distanceLimit(value: number) {
    this._distanceLimit = value;
  }

  static get AmsterdamLocation(): { latitude: number; longitude: number } {
    return this._AmsterdamLocation;
  }

  static set AmsterdamLocation(value: { latitude: number; longitude: number }) {
    this._AmsterdamLocation = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get tag(): String {
    return this._tag;
  }

  set tag(value: String) {
    this._tag = value;
  }

  get status(): ScooterStatus {
    return this._status;
  }

  set status(value: ScooterStatus) {
    this._status = value;
  }

  get gpsLocation(): string {
    return this._gpsLocation;
  }

  set gpsLocation(value: string) {
    this._gpsLocation = value;
  }

  get batteryCharge(): number {
    return this._batteryCharge;
  }

  set batteryCharge(value: number) {
    this._batteryCharge = value;
  }

  get setMileage(): number {
    return this._setMileage;
  }

  set setMileage(value: number) {
    this._setMileage = value;
  }

  getStatusToString(){
    return ScooterStatus[this.status];
  }

  getScooterStatusEnum(){
    return ScooterStatus;
  }

}
