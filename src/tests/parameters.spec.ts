import { expect } from 'chai';
import { Parameter, Parameters, Value } from '../models';

describe('Parameters', () => {
  it('writes a comma seperated list of parameters', () => {
    const param = new Parameter(new Value('test'));
    const defaultParam = new Parameter(new Value('test'), new Value(true));
    const params = new Parameters([param, defaultParam]);
    expect(params.write()).to.eq('test, test = true');
  });

  it('writes a destructured list of parameters', () => {
    const param = new Parameter(new Value('test'));
    const param2 = new Parameter(new Value('test2'));
    const params = new Parameters([param, param2], true);
    expect(params.write()).to.eq('{test, test2}');
  });
});
