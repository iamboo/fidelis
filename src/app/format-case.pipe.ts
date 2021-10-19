import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCase' })
export class FormatCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }
}
