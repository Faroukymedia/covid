import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateHelper {

  /**
   * Parse a date string with the input format defined in moment.js (eg. 'DDMMYYYY')
   */
  public static parseDate(dateString: string, format: string): Date {
    return moment.utc(dateString, format).toDate();
  }
}
