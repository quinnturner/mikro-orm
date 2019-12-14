import { Type } from './Type';
import { Platform } from '../platforms';
import { EntityProperty } from '../typings';

export class DateType extends Type {

  convertToDatabaseValue(value: any, platform: Platform): any {
    if (value instanceof Date) {
      return value.toISOString().substr(0, 10);
    }

    if (!value || value.toString().match(/^\d{4}-\d{2}-\d{2}$/)) {
      return value;
    }

    throw new Error(`Could not convert JS value '${value}' to type ${DateType.name}`);
  }

  convertToJSValue(value: any, platform: Platform): any {
    if (!value || value instanceof Date) {
      return value;
    }

    const date = new Date(value);

    if (date.toString() === 'Invalid Date') {
      throw new Error(`Could not convert database value '${value}' to type ${DateType.name}`);
    }

    return date;
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return 'date';
  }

}
