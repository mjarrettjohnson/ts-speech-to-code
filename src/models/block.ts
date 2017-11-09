import { Writeable } from './index';

export class Block implements Writeable {
  private properties: Array<Writeable>;

  constructor(properties: Array<Writeable> = []) {
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
