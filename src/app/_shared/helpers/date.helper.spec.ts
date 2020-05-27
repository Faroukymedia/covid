import { TestBed } from '@angular/core/testing';

import { DateHelper } from './date.helper';

describe('DateHelper', () => {
  let service: DateHelper;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DateHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse a date correctly', () => {
    const dateToParse = '19032020';
    const expectedDate = new Date('2020-03-19');
    expect(DateHelper.parseDate(dateToParse, 'DDMMYYYY')).toStrictEqual(expectedDate);
  });

});
