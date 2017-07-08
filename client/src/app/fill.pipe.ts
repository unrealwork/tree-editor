import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      value = 0;
    }
    return (new Array(value)).fill(1);
  }

}
