import { expect } from 'chai';
import { Expression, Value, OPERATORS } from '../models';

describe('Expression', () => {
  it('should handle a simple addition of numbers', () => {
    const v1 = new Value(1);
    const op = OPERATORS.PLUS;

    const expr = new Expression([v1, v1], [op]);
    expect(expr.write()).to.eq('1 + 1');
  });

  it('should handle a simple addition of multiple numbers', () => {
    const v1 = new Value(1);
    const op = OPERATORS.PLUS;
    const v2 = new Value(1);

    const expr = new Expression([v1, v1, v2, v2], [op, op, op]);
    expect(expr.write()).to.eq('1 + 1 + 1 + 1');
  });

  it('should handle addition of strings', () => {
    const v1 = new Value('trunk', true);
    const v2 = new Value('dust', true);
    const op = OPERATORS.PLUS;
    const expr = new Expression([v1, v2], [op]);
    expect(expr.write()).to.eq(`'trunk' + 'dust'`);
  });

  it('should handle dot method of variables', () => {
    const v1 = new Value('trunk');
    const v2 = new Value('dust');
    const op = OPERATORS.DOT;
    const expr = new Expression([v1, v2], [op]);
    expect(expr.write()).to.eq('trunk.dust');
  });

  it('should handle a boolean statement', () => {
    const v1 = new Value('operators.length');
    const v2 = new Value(0);
    const op = OPERATORS.EQUALS;
    const expr = new Expression([v1, v2], [op]);
    expect(expr.write()).to.eq('operators.length === 0');
  });
});
