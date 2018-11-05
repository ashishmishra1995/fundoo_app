import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLabel'
})
export class FilterLabelPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return null;
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return JSON.stringify(it).toLowerCase().includes(searchText);
        });
   } 

}
