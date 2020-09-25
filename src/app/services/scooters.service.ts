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

  save(scooter:Scooter){
    let foundScooter = this.findById(scooter.id);
    if(foundScooter != null){
      this.scooters.splice(this.scooters.indexOf(foundScooter), 1);
      this.scooters.push(scooter);
    } else{
      this.scooters.push(scooter);
    }
  }

  findAll():Scooter[]{
    return this.scooters;
  }

  findById(scooterId):Scooter{
    for(let scooter of this.scooters){
      if(scooter.id == scooterId){
        return scooter
      }
    }
    return null;
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
