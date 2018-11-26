import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { MatSnackBar } from '@angular/material';
import { DataServiceService } from '@service/data-service/data-service.service';
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  records = {};
  notes = [];
  constructor(private httpService: HttpService,
    private snackBar: MatSnackBar,
    private data: DataServiceService,
    private noteService: NoteService) { }
  @Input() notesArray;
  @Output() eventDelete = new EventEmitter();
  ngOnInit() {
    this.getDelNotes();
    this.gridList();
  }
  toggle=false;
  gridList(){
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message=>{
      this.toggle=message;
    })
  }
  getDelNotes() {
    var token = localStorage.getItem('token');
    this.records = this.httpService.httpGetNote('notes/getTrashNotesList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      for (var i = 0; i < result['data']['data'].length; i++) {
        if (result['data']['data'][i].isDeleted == true) {
          this.notes.push(result['data']['data'][i])
        }
      }

    }, error => {
   
    });
  }
  body = {};
  restore(id) {
    
    // var token = localStorage.getItem('token');
    this.body = {
      "isDeleted": false,
      "noteIdList": [id]
    }
    this.records = this.noteService.trash(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('Note restored', 'Successfully', {
        duration: 3000,
      });
     
      this.eventDelete.emit({

      })
    }, error => {

      this.snackBar.open('Note restoration', 'Failed', {
        duration: 3000,
      });

    });
  }

  deleteForever(id){
    // var token = localStorage.getItem('token');
    this.body = {
      "isDeleted": false,
      "noteIdList": [id]
    }
    this.records = this.noteService.deleteForever(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('Note deleted', 'Successfully', {
        duration: 3000,
      });
     
      this.eventDelete.emit({

      })
    }, error => {
     
      this.snackBar.open('Note deletion', 'Failed', {
        duration: 3000,
      });

    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
