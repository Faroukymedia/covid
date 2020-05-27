import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'isMoreRecentThan'
})
export class IsMoreRecentThanPipe implements PipeTransform {

  public transform(date: Date, value: number, unit: any): boolean {
    return moment.duration(moment(moment.now()).diff(date)).as(unit) < value;
  }

}
