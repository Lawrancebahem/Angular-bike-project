/**
 * Scooter class
 */
export class Scooter {

  private static randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  private static startingCode = 30001;
  private static  distanceLimit =  5000; // in meters
  private static AmsterdamLocation = {latitude: 52.377956, longitude: 4.897070};

  constructor(private _id: number, private _tag: String,
              private _status: ScooterStatus, private _gpsLocation: String,
              private _mileage: number, private _batteryCharge: number) {
    this._id = _id;
    this._tag = _tag;
    this._status = _status;
  }

  /**
   * Create a random scooter with random information
   */
  public static createRandomScooter(){

    const randomId = this.startingCode++;
    const randomTag = this.generateRandomTag(8, this.randomString);
    const randomStatus = this.getRandomStatus(ScooterStatus);
    const randomGPS = this.randomGeo(this.AmsterdamLocation.latitude,	this.AmsterdamLocation.longitude);
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
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }

  /**
   * Generate random latitude, longitude. Based on a latitude and longitude
   * @param latitude
   * @param longitude
   * @private
   */
  public static randomGeo(latitude, longitude){
    const y0 = latitude;
    const x0 = longitude;
    const rd = this.distanceLimit / 111300; // about 111300 meters in one degree

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


  get id(): number {
    return this._id;
  }

  get tag(): String {
    return this._tag;
  }

  get status(): ScooterStatus {
    return this._status;
  }

  get gpsLocation(): String {
    return this._gpsLocation;
  }

  get mileage(): number {
    return this._mileage;
  }

  get batteryCharge(): number {
    return this._batteryCharge;
  }
  public getScooterStatusEnum(){
    return ScooterStatus;
  }
}
enum ScooterStatus {
  IDLE,
  INUSE,
  MAINTENANCE,
}
