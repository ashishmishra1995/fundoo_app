import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';


@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  @Input() noteDetails;
  @Output() eventColor = new EventEmitter();
  body={
    "color": "",
    "noteIdList": []
  }
 
  ngOnInit() {
  }

  setcolor(id) {
    this.eventColor.emit(id);
    var token = localStorage.getItem('token');
    this.body={
      "color": id,
      "noteIdList": [this.noteDetails.id]
    }
    this.httpService.httpColorNote('notes/changesColorNotes',this.body, token).subscribe(result => {
      
      console.log(this.noteDetails.id);
      this.eventColor.emit({

      })

    }, error => {
      console.log(error);
      
      
    });
  }
}
