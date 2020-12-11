import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {CanDeactivateComponent} from "./can-deactivate-component";

// @Injectable({
//   providedIn: 'root'
// })
// export class LeavingSiteGuardGuard implements CanDeactivate<CanDeactivateComponent> {
//     constructor(public message?:string) {
//   }
//
//   canDeactivate(component: CanDeactivateComponent) {
//     return !component.canDeactivate() ? true: confirm(this.message ||"You have unsaved changes, are you sure you want to discard?")
//   }
//
// }
