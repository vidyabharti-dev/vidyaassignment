import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: "sortBy"})
export class SortPipe implements PipeTransform {

    transform(values: any[]): any[] {
        return values.sort((a, b) => a.drink_name.localeCompare(b.drink_name));
      }

    
}