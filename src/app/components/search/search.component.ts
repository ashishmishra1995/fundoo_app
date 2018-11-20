import { Component, OnInit, Input, Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { HttpService } from '../../core/service/http/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() noteDetails;
  @Input() notesArray;
  @Input() message: string;

  search;
  
  notes = [];
  constructor(private httpService: HttpService,
    private data: DataServiceService) { }

  ngOnInit() {
    this.data.currentDataSearch.subscribe(message => {
      this.search = message
   
    })
    
    this.readData();
  }

  readData() {
    this.notes = [];
    var token = localStorage.getItem('token');
    this.httpService.httpGetNote('notes/getNotesList', token).subscribe((data: any) => {
      
      data.data.data.forEach(element => {
        this.notes.push(element)
      })
     
    })
  }

}
