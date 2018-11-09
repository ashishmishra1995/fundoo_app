import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return null;
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
        return items.filter( it => {
          var object={
            'title': it.title,
            'description': it.description,
            'noteLabels': it.noteLabels
          }
          return JSON.stringify(it).toLowerCase().includes(searchText);
        });
   } 

}
