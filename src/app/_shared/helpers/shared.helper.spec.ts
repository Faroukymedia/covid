import { SharedHelper } from './shared.helper';

describe('SharedHelper', () => {
  it('should capitalize the first letter of each words', () => {
    let capitalizedStr = SharedHelper.capitalize('test');

    expect(capitalizedStr).toEqual('Test');

    capitalizedStr = SharedHelper.capitalize('TEST');

    expect(capitalizedStr).toEqual('Test');

    capitalizedStr = SharedHelper.capitalize('this is a test');

    expect(capitalizedStr).toEqual('This Is A Test');
  });
});
