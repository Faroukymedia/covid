import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@shared/helpers/date.helper';

/**
 * Parse a date string with the input format defined in moment.js (eg. 'DDMMYYYY')
 */
@Pipe({
  name: 'parseDate'
})
export class ParseDatePipe implements PipeTransform {

  public transform(dateString: string, format: string): Date {
    return DateHelper.parseDate(dateString, format);
  }

}
