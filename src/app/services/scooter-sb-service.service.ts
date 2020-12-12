import {Injectable} from '@angular/core';
import {Scooter} from '../models/scooter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScooterSbServiceService {
  private URL = 'http://localhost:8080/scooters';
  scooters: Scooter[];
  public selectedScooter = -1;
  private scooter:Scooter;


  constructor(private httpClient: HttpClient) {
    this.scooters = [];
    this.restGetScooters();
  }

  // TO-DO: Return previous scooter else null
  save(scooter: Scooter): Observable<Scooter> {
    let foundScooter = this.scooters.find(scooter => scooter.id = scooter.id);
    if (foundScooter != null) {
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1, scooter);
      return this.resPutScooter(scooter);
    } else {
      this.scooters.push(scooter);
      return this.resPostScooter(scooter);
    }
  }

  findAll(): Scooter[] {
    return this.scooters;
  }

  findById(scooterId): Observable<any> {
    let observable = this.httpClient.get<any>(this.URL + "/" +scooterId).pipe(shareReplay(1));
    return observable;
  }



  deleteById(id) {
    let foundScooter = this.scooters.find(scooter => scooter.id = id);
    if (foundScooter != null) {
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1);
      this.resDeleteScooter(id);
      return foundScooter;
    }
    return null;
  }

  /**
   * GET request to get the list of scooters
   * @private
   */
  private restGetScooters(): Observable<Scooter[]> {
    let observable = this.httpClient.get<Scooter[]>(this.URL).pipe(shareReplay(1));
    observable.subscribe((scooters) => {
      this.scooters = scooters ? scooters.map((scooter) => Scooter.trueCopy(scooter)):[];
    },error => {
      console.log(error);
    })
    return observable;
  }


  /**
   * Post request to add a new scooter
   * @param scooter
   */
  public resPostScooter(scooter: Scooter): Observable<Scooter> {
    let observable = this.httpClient.post<Scooter>(this.URL, scooter).pipe(shareReplay(1));
    return observable;
  }

  /**
   * Update request to update a scooter
   * @param scooter
   */
  public resPutScooter(scooter: Scooter): Observable<Scooter> {
    const toUpdateScooter = {
      id: scooter.id,
      tag: scooter.tag,
      status: scooter.status,
      chargeBattery: scooter.batteryCharge,
      gpsLocation: scooter.gpsLocation,
      mileage: scooter.getMileage
    };
    let observable = this.httpClient.put<Scooter>((this.URL + '/' + scooter.id), toUpdateScooter).pipe(shareReplay(1));
    return observable;
  }

  /**
   * Delete request based on the give id in the parameters
   * @param id
   */
  public resDeleteScooter(id: number): void {
    this.httpClient.delete(this.URL + '/' + id).subscribe((response) => {
      console.log('The scooter with that id ' + id + ' has been deleted');
    }, error => {
      console.log(error);
    });
  }
}
