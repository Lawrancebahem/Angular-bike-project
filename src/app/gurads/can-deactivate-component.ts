
import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {HttpClient} from "@angular/common/http";

export interface CanDeactivateComponent {
  canDeactivate(message?:string):boolean;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<CanDeactivateComponent>{

  constructor() {
  }

  canDeactivate(component: CanDeactivateComponent) {
    return !component.canDeactivate() ? true: confirm("You have unsaved changes, are you sure you want to discard?")
  }
}
