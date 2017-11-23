import { expect } from 'chai';
import { Variable, Expression, Value, OPERATORS } from '../models';

describe('Variable', () => {
  it('writes a simple string constant', () => {
    const v = new Variable('test', new Value(true));

    expect(v.write()).to.eq('const test = true');
  });

  it('writes a simple string let', () => {
    const v = new Variable('test', new Value(true), Variable.types.LET);

    expect(v.write()).to.eq('let test = true');
  });

  it('writes a simple string this', () => {
    const v = new Variable('test', new Value(true), Variable.types.THIS);

    expect(v.write()).to.eq('this.test = true');
  });

  it('writes a simple string var', () => {
    const v = new Variable('test', new Value(true), Variable.types.REGULAR);

    expect(v.write()).to.eq('var test = true');
  });

  it('writes a constant with an expression value', () => {
    const ex = new Expression(
      [new Value('arr'), new Value('length'), new Value(0)],
      [OPERATORS.STOP, OPERATORS.EQUALS]
    );
    const v = new Variable('isEmpty', ex);
    expect(v.write()).to.eq('const isEmpty = arr.length === 0');
  });
});
