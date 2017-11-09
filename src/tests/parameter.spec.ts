import { expect } from 'chai';
import { Parameter, Value } from '../models';

describe('Parameter', () => {
  it('writes a value', () => {
    const v = new Value('test');

    const param = new Parameter(v);
    expect(param.write()).to.eq('test');
  });

  it('writes a param with a default value', () => {
    const param = new Parameter(new Value('test'), new Value(true));
    expect(param.write()).to.eq('test = true');
  });
});
