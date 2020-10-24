import {Injectable} from '@angular/core';
import {Scooter} from '../models/scooter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScooterSbServiceService {

  private URL = 'http://localhost:8080/scooters';
  scooters: Scooter[];
  public selectedScooter = -1;


  constructor(private httpClient: HttpClient) {
    this.scooters = [];
    const  scoo = this.getRandom();
    this.resPostScooter(scoo).subscribe((response)=>{
      console.log("Has been added")
    },error => {
      console.log(error);
    });
    console.log(scoo)
    this.restGetScooters().subscribe((scooters) => {
      for (let scooter of scooters) {
        let newScooter = Scooter.trueCopy(scooter);
        if (newScooter != null) {
          this.scooters.push(newScooter);
        }
      }
    }, error => {
      console.log(error);
    });

  }

  // TO-DO: Return previous scooter else null
  save(scooter: Scooter) {
    let foundScooter = this.findById(scooter.id);
    if (foundScooter != null) {
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1, scooter);
    } else {
      this.scooters.push(scooter);
    }
  }

  findAll(): Scooter[] {
    return this.scooters;
  }

  findById(scooterId): Scooter {
    return this.scooters.find(scooter => scooter.id === scooterId);
  }

  deleteById(id): Scooter {
    let foundScooter = this.findById(id);
    if (foundScooter != null) {
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1);
      return foundScooter;
    }
    return null;
  }

  private restGetScooters(): Observable<Scooter[]> {
    return this.httpClient.get<Scooter[]>(this.URL);
  }


  public resPostScooter(scooter: Scooter): Observable<Scooter> {
    const postData = {
      id: scooter.id,
      tag: scooter.tag,
      status: scooter.status,
      chargeBattery: scooter.batteryCharge,
      gpsLocation: scooter.gpsLocation,
      mileage: scooter.getMileage
    };
    return this.httpClient.post<Scooter>(this.URL, postData);
  }

  public resPutScooter(scooter: Scooter): Observable<Scooter> {
    const toUpdateScooter = {
      id: scooter.id,
      tag: scooter.tag,
      status: scooter.status,
      chargeBattery: scooter.batteryCharge,
      gpsLocation: scooter.gpsLocation,
      mileage: scooter.getMileage
    };
    return this.httpClient.put<Scooter>(this.URL + '/scooter/' + scooter.id, toUpdateScooter);
  }

  public resDeleteScooter(id: number): void {
    this.httpClient.delete(this.URL + '/scooter/' + id).subscribe((response) => {
      console.log('The scooter with that id ' + id + ' has been deleted');
    }, error => {
      console.log(error);
    });
  }

  private getRandom(): Scooter {
    return Scooter.createRandomScooter();
  }
}
