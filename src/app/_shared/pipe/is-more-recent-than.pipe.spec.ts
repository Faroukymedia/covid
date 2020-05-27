import { IsMoreRecentThanPipe } from './is-more-recent-than.pipe';
import * as moment from 'moment';

describe('IsMoreRecentThanPipe', () => {
  let pipe: IsMoreRecentThanPipe;
  beforeEach(() => {
    pipe = new IsMoreRecentThanPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if date is less than 1 month', () => {
    const dateNow = moment();
    const inspectedDate = dateNow.subtract(30, 'days').toDate();
    expect(pipe.transform(inspectedDate, 1, 'month')).toBe(true);
  });

  it('should return false if date is more than or equal to 1 month', () => {
    const dateNow = moment();
    const inspectedDate = dateNow.subtract(31, 'days').toDate();
    expect(pipe.transform(inspectedDate, 1, 'month')).toBe(false);
  });

  it('should return false if date is 2 years ago', () => {
    const dateNow = moment();
    const inspectedDate = dateNow.subtract(2, 'years').toDate();
    expect(pipe.transform(inspectedDate, 1, 'month')).toBe(false);
  });
});
