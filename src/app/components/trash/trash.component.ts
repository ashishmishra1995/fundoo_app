import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http/http.service';
import { MatSnackBar } from '@angular/material';
import { DataServiceService } from '../../service/data-service/data-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  records = {};
  notes = [];
  constructor(private httpService: HttpService,
    private snackBar: MatSnackBar,
  private data: DataServiceService) { }
  @Input() notesArray;
  @Output() eventDelete = new EventEmitter();
  ngOnInit() {
    this.getDelNotes();
    this.gridList();
  }
  toggle=false;
  gridList(){
    this.data.currentMessage.subscribe(message=>{
      this.toggle=message;
    })
  }
  getDelNotes() {
    var token = localStorage.getItem('token');
    this.records = this.httpService.httpGetNote('notes/getTrashNotesList', token).subscribe(result => {
      console.log(result);
      for (var i = 0; i < result['data']['data'].length; i++) {
        if (result['data']['data'][i].isDeleted == true) {
          this.notes.push(result['data']['data'][i])
        }
      }
      console.log(this.notes);

    }, error => {
      console.log(error);
    });
  }
  body = {};
  restore(id) {
    
    var token = localStorage.getItem('token');
    this.body = {
      "isDeleted": false,
      "noteIdList": [id]
    }
    this.records = this.httpService.httpDeleteNote('notes/trashNotes', this.body, token).subscribe(result => {
      this.snackBar.open('Note restored', 'Successfully', {
        duration: 3000,
      });
     
      this.eventDelete.emit({

      })
    }, error => {
      console.log(error);
      this.snackBar.open('Note restoration', 'Failed', {
        duration: 3000,
      });

    });
  }

  deleteForever(id){
    var token = localStorage.getItem('token');
    this.body = {
      "isDeleted": false,
      "noteIdList": [id]
    }
    this.records = this.httpService.httpDeleteNote('notes/deleteForeverNotes', this.body, token).subscribe(result => {
      this.snackBar.open('Note deleted', 'Successfully', {
        duration: 3000,
      });
     
      this.eventDelete.emit({

      })
    }, error => {
      console.log(error);
      this.snackBar.open('Note deletion', 'Failed', {
        duration: 3000,
      });

    });
  }
}
