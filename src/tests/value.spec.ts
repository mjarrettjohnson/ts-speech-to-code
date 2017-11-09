import { expect } from 'chai';
import { Value } from '../models';

describe('value', () => {
  it('should wrap a string value with quotes', () => {
    const value = new Value('dust', true);

    expect(value.write()).to.eq(`'dust'`);
  });

  it('should write a VARIABLE type value without quotes', () => {
    const value = new Value('dust');
    expect(value.write()).to.eq('dust');
  });
});
