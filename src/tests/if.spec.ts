import { expect } from 'chai';
import {
  Block,
  If,
  Expression,
  Variable,
  Value,
  NegatedValue,
  OPERATORS,
  CONDITIONALS,
} from '../models';

describe('If', () => {
  it('writes out a simple boolean if', () => {
    const value = new Value('isValid');
    const ifStatement = new If([value], [], new Block());

    expect(ifStatement.write()).to.eq('if (isValid) {}');
  });

  it('writes out a simple boolean AND statement', () => {
    const ifStatement = new If(
      [new Value('exists'), new Value('isValid')],
      [CONDITIONALS.AND],
      new Block()
    );
    expect(ifStatement.write()).to.eq('if (exists && isValid) {}');
  });

  it('writes a simple expression if statement', () => {
    const ex = new Expression(
      [new Value('arr'), new Value('length'), new Value(0)],
      [OPERATORS.STOP, OPERATORS.EQUALS]
    );
    const ifStatement = new If([ex], [], new Block());

    expect(ifStatement.write()).to.eq('if (arr.length === 0) {}');
  });

  it('writes an || expression if statement', () => {
    const ex = new Expression(
      [new Value('arr'), new Value('length'), new Value(0)],
      [OPERATORS.STOP, OPERATORS.EQUALS]
    );

    const ex2 = new Expression(
      [new Value('arr'), new Value('length'), new Value(10)],
      [OPERATORS.STOP, OPERATORS.GREATER_THAN]
    );
    const ifStatement = new If([ex, ex2], [CONDITIONALS.OR], new Block());
    expect(ifStatement.write()).to.eq(
      'if (arr.length === 0 || arr.length > 10) {}'
    );
  });

  it('writes a negated if statement', () => {
    const value = new NegatedValue('isValid');
    const ifStatement = new If([value], [], new Block());

    expect(ifStatement.write()).to.eq('if (!isValid) {}');
  });

  it('writes out a boolean else if', () => {
    const value = new Value('isValid');
    const ifStatement = new If([value], [], new Block(), true);

    expect(ifStatement.write()).to.eq('else if (isValid) {}');
  });
  it('writes out a simple boolean if, with a block', () => {
    const value = new Value('isValid');
    const ifStatement = new If(
      [value],
      [],
      new Block([
        new Variable(
          'result',
          new Value('this is a result', true),
          Variable.types.LET
        ),
      ])
    );

    expect(ifStatement.write()).to.eq(
      `if (isValid) {let result = 'this is a result'\n}`
    );
  });
});
