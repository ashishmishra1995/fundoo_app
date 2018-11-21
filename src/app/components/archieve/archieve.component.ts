import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from "../../core/service/note-service/note-service.service";
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.scss']
})
export class ArchieveComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  records={};
  notes=[];
  @Input() noteDetails;

  constructor(private httpService: HttpService,
  private data: DataServiceService,
  public snackBar: MatSnackBar,
  private noteService: NoteService) { }
  
  ngOnInit() {
    this.getNotes();
    this.gridList();
  }
  toggle=false;
  gridList(){
    this.data.currentMessage.subscribe(message=>{
      this.toggle=message;
    })
  }
  getNotes(){
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getArchiveNotesList',token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
      for(var i=0; i<result['data']['data'].length; i++){
        if(result['data']['data'][i].isDeleted==false){
        this.notes.push(result['data']['data'][i])
        }
      }
    // this.notes=result['data']['data'].reverse();
          
      
    },error=>{
    });
  }
  
  public body={};
  unarchive(id) {
    
    var token = localStorage.getItem('token');
    this.body={
      "isArchived": false,
      "noteIdList": [id]
    }
    this.records = this.noteService.archive(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('Note unarchived', 'Successfully', {
        duration: 3000,
      });
      this.getNotes();

    }, error => {
    
      
      this.snackBar.open('Note unarchiving', 'Failed', {
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
