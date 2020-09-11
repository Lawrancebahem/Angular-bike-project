import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

/**
 * This class extends the DatePipe and implements PipeTransform to transform the given date to the required form
 */
@Pipe({
  name: 'customDate'
})

export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'EEEE d MMMM y');
  }
}
