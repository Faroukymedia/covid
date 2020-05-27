import { TestBed } from '@angular/core/testing';

import { CollapseHelper } from './collapse.helper';

describe('CollapseHelper', () => {
  const element = {
    getAttribute: jest.fn(),
    setAttribute: jest.fn(),
    addEventListener: (event: string, callback: () => {}) => callback(),
    removeEventListener: jest.fn(),
    style: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    document.getElementById = jest.fn().mockReturnValue(element);
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    };
  });

  it('should do nothing is the element does not exist', () => {
    document.getElementById = jest.fn().mockReturnValue(null);

    const result = CollapseHelper.toggle('toto');

    expect(result).toBe(false);
  });

  it('should expand the element if it is collapsed', () => {
    element.getAttribute = jest.fn().mockReturnValue('true');

    const result = CollapseHelper.toggle('toto');

    expect(result).toBe(true);
    expect(element.setAttribute).toHaveBeenCalledWith('data-collapsed', 'false');
  });

  it('should collapse the element if it is expanded', () => {
    element.getAttribute = jest.fn().mockReturnValue('false');

    const result = CollapseHelper.toggle('toto');

    expect(result).toBe(true);
    expect(element.setAttribute).toHaveBeenCalledWith('data-collapsed', 'true');
  });
});
