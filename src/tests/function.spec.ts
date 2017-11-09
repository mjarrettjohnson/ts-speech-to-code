import { expect } from 'chai';

import {
  If,
  Else,
  Obj,
  Block,
  Func,
  Variable,
  Parameters,
  Parameter,
  Expression,
  Value,
  OPERATORS,
  CONDITIONALS,
} from '../models';

describe('Function', () => {
  describe('arrow return', () => {
    it('writes a simple no parameter func', () => {
      const f = new Func('', undefined, [
        new Variable(
          'isValid',
          new Expression(
            [new Value('arr'), new Value('length'), new Value(0)],
            [OPERATORS.DOT, OPERATORS.EQUALS]
          )
        ),
        new If(
          [new Value('exists'), new Value('isValid')],
          [CONDITIONALS.AND],
          new Block([
            new Variable('result', new Value(true), Variable.types.LET),
          ])
        ),
        new Else(
          new Block([
            new Variable('result', new Value(false), Variable.types.LET),
          ])
        ),
      ]);

      expect(f.write()).to.eq(
        `() => {\nconst isValid = arr.length === 0\nif (exists && isValid) {let result = true\n}\nelse {let result = false\n}\n}`
      );
    });

    it('writes a simple parameter func', () => {
      const f = new Func(
        '',
        new Parameters([
          new Parameter(new Value('name')),
          new Parameter(new Value('age')),
        ]),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ]
      );

      expect(f.write()).to.eq(
        `(name, age) => {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });

    it('writes a func with destructured params', () => {
      const f = new Func(
        '',
        new Parameters(
          [new Parameter(new Value('name')), new Parameter(new Value('age'))],
          true
        ),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ]
      );

      expect(f.write()).to.eq(
        `({name, age}) => {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });
  });

  describe('class function', () => {
    it('writes a simple no parameter func', () => {
      const f = new Func(
        'classFunc',
        undefined,
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.CLASS
      );

      expect(f.write()).to.eq(
        `classFunc () {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });

    it('writes a simple parameter func', () => {
      const f = new Func(
        'classFunc',
        new Parameters([
          new Parameter(new Value('name')),
          new Parameter(new Value('age')),
        ]),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.CLASS
      );

      expect(f.write()).to.eq(
        `classFunc (name, age) {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });

    it('writes a func with destructured params', () => {
      const f = new Func(
        'classFunc',
        new Parameters(
          [new Parameter(new Value('name')), new Parameter(new Value('age'))],
          true
        ),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.CLASS
      );

      expect(f.write()).to.eq(
        `classFunc ({name, age}) {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });
  });

  describe('regular function', () => {
    it('writes a simple no parameter func', () => {
      const f = new Func(
        'doSomething',
        undefined,
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.REGULAR
      );

      expect(f.write()).to.eq(
        `function doSomething () {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });

    it('writes a simple parameter func', () => {
      const f = new Func(
        'doSomething',
        new Parameters([
          new Parameter(new Value('name')),
          new Parameter(new Value('age')),
        ]),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new Variable(
            'config',
            new Obj([
              {
                prop: 'name',
                value: new Expression(
                  [new Value('Miles', true), new Value('Johnson', true)],
                  [OPERATORS.PLUS]
                ),
              },
              { prop: 'age', value: new Value(24) },
            ])
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.REGULAR
      );

      expect(f.write()).to.eq(
        `function doSomething (name, age) {\nconst isValid = arr.length === 0\nconst config = {name: 'Miles' + 'Johnson', age: 24}\nif (exists && isValid) {}\n}`
      );
    });

    it('writes a func with destructured params', () => {
      const f = new Func(
        'doSomething',
        new Parameters(
          [new Parameter(new Value('name')), new Parameter(new Value('age'))],
          true
        ),
        [
          new Variable(
            'isValid',
            new Expression(
              [new Value('arr'), new Value('length'), new Value(0)],
              [OPERATORS.DOT, OPERATORS.EQUALS]
            )
          ),
          new If(
            [new Value('exists'), new Value('isValid')],
            [CONDITIONALS.AND],
            new Block()
          ),
        ],
        Func.types.REGULAR
      );

      expect(f.write()).to.eq(
        `function doSomething ({name, age}) {\nconst isValid = arr.length === 0\nif (exists && isValid) {}\n}`
      );
    });
  });
});
