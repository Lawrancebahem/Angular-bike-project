import {Scooter} from "../models/scooter";
import {EventEmitter, Input, Output} from '@angular/core';

export class ScootersService {
  scooters:Scooter[];
  public selectedScooter = -1;
  public previousSelected;
  constructor() {
    this.scooters = [];
    for (let i = 0; i < 8; i++) {
      this.scooters.push(Scooter.createRandomScooter());
    }
  }

  // TODO: Return previous scooter else null
  save(scooter:Scooter){
    let foundScooter = this.findById(scooter.id);
    if(foundScooter != null){
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1, scooter);
    } else{
      this.scooters.push(scooter);
    }
  }

  findAll():Scooter[]{
    return this.scooters;
  }

  findById(scooterId):Scooter{
    return this.scooters.find(scooter => scooter.id === scooterId);
  }

  deleteById(id):Scooter{
    let foundScooter = this.findById(id);
    if(foundScooter != null){
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1);
      return foundScooter;
    }
    return null;
  }

}
