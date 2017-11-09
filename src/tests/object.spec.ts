import { expect } from 'chai';
import { Obj, Expression, Value, OPERATORS } from '../models';

describe('Object', () => {
  it('sets the correct properties and value type values', () => {
    const properties = [
      { prop: 'key', value: new Value('name', true) },
      { prop: 'value', value: new Value('Miles', true) },
    ];
    const o = new Obj(properties);
    expect(o.write()).to.eq(`{key: 'name', value: 'Miles'}`);
  });

  it('correctly writes a property with an expression value', () => {
    const expr = new Expression(
      [new Value('arr'), new Value('DoSomething')],
      [OPERATORS.DOT]
    );

    const props = [
      {
        prop: 'key',
        value: expr,
      },
    ];
    const o = new Obj(props);

    expect(o.write()).to.eq('{key: arr.DoSomething}');
  });
});
