import { ParseDatePipe } from './parse-date.pipe';

describe('ParseDatePipe', () => {
  let pipe: ParseDatePipe;

  beforeEach(() => {
    pipe = new ParseDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should parse a date correctly', () => {
    const dateToParse = '19032020';
    const expectedDate = new Date('2020-03-19');
    expect(pipe.transform(dateToParse, 'DDMMYYYY')).toStrictEqual(expectedDate);
  });
});
