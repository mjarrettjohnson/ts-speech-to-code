import { IWriteable } from './index';

export class Block implements IWriteable {
  private properties: Array<IWriteable>;

  constructor(properties: Array<IWriteable> = []) {
    this.properties = properties;
  }
  write(): string {
    let result: string = `{`;
    this.properties.forEach(prop => {
      result += `${prop.write()}\n`;
    });
    result += '}';
    return result;
  }
}
