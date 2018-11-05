import { Component, OnInit, Input, Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';
import { DataServiceService } from '../../service/data-service/data-service.service';
import { HttpService } from '../../service/http/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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
      console.log("search data: ",this.search)
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
      console.log("read data: ", this.notes);
    })
  }

}
