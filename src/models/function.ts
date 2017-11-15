import { IWriteable } from './index';
import { Parameters } from './parameters';

export class Func implements IWriteable {
  static types = {
    ARROW: 'arrow',
    IIFO: 'iifo',
    ARROW_RETURN: 'arrow-return',
    CLASS: 'class',
    REGULAR: 'regular',
  };

  private name: string;
  private parameters: Parameters | void;
  private properties: Array<IWriteable>;
  private type: string;

  constructor(
    name: string,
    parameters: Parameters | void,
    properties: Array<IWriteable> = [],
    type: string = Func.types.ARROW_RETURN
  ) {
    this.name = name;
    this.parameters = parameters;
    this.properties = properties;
    this.type = type;
  }

  writeArrowReturn(): string {
    let result = `(${this.parameters ? this.parameters.write() : ''}) => {\n`;
    this.properties.forEach(prop => {
      result += `${prop.write()}\n`;
    });
    result += '}';
    return result;
  }

  writeClassfunc(): string {
    let result = `${this.name} (${this.parameters
      ? this.parameters.write()
      : ''}) {\n`;
    this.properties.forEach(prop => {
      result += `${prop.write()}\n`;
    });
    result += '}';
    return result;
  }

  writeRegularFunction(): string {
    let result = `function ${this.name || ''} (${this.parameters
      ? this.parameters.write()
      : ''}) {\n`;
    this.properties.forEach(prop => {
      result += `${prop.write()}\n`;
    });
    result += '}';
    return result;
  }

  write(): string {
    switch (this.type) {
      case Func.types.ARROW:
      case Func.types.ARROW_RETURN:
        return this.writeArrowReturn();
      case Func.types.CLASS:
        return this.writeClassfunc();
      case Func.types.IIFO:
      case Func.types.REGULAR:
        return this.writeRegularFunction();
      default:
        return '';
    }
  }
}
