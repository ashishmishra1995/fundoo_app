import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { HttpService } from '../../core/service/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() noteDetails;
  @Input() notesArray;
  @Input() message: string;

  search;
  
  notes = [];
  constructor(private httpService: HttpService,
    private data: DataServiceService) { }

  ngOnInit() {
    this.data.currentDataSearch
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.search = message
   
    })
    
    this.readData();
  }

  readData() {
    this.notes = [];
    var token = localStorage.getItem('token');
    this.httpService.httpGetNote('notes/getNotesList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      
      data.data.data.forEach(element => {
        this.notes.push(element)
      })
     
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
