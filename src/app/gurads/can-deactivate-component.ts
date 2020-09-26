
import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate():boolean;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<CanDeactivateComponent>{
  canDeactivate(component: CanDeactivateComponent) {
    return !component.canDeactivate() ? true: confirm("You have unsaved changes, are you sure you want to discard?")
  }
}
