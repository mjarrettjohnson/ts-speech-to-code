import { expect } from 'chai';
import { Obj, Arr, Value } from '../models';

describe('Array', () => {
  it('writes out a simple array of strings', () => {
    const arr = new Arr([
      new Value('this', true),
      new Value('is', true),
      new Value('an', true),
      new Value('array', true),
      new Value('dog', true),
    ]);

    expect(arr.write()).to.eq(`['this', 'is', 'an', 'array', 'dog']`);
  });

  it('writes an array of objects', () => {
    const o1 = new Obj([
      {
        prop: 'FirstName',
        value: new Value('Miles', true),
      },
      {
        prop: 'LastName',
        value: new Value('Johnson', true),
      },
    ]);

    const o2 = new Obj([
      {
        prop: 'FirstName',
        value: new Value('Demi', true),
      },
      {
        prop: 'LastName',
        value: new Value('Zantides', true),
      },
    ]);
    const arr = new Arr([o1, o2]);

    expect(arr.write()).to.eq(
      `[{FirstName: 'Miles', LastName: 'Johnson'}, {FirstName: 'Demi', LastName: 'Zantides'}]`
    );
  });
});
