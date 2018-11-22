/**
 * @description This component aims at archiving a note 
 */
import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { MatSnackBar } from "@angular/material";
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public body={
    "isArchived":true,
    "noteIdList":[]
  }
  public records={};
  constructor(private httpService: HttpService,
    public snackBar: MatSnackBar,
    private noteService: NoteService) { }
  @Input() noteDetails;
  @Output() eventArchive= new EventEmitter();

  ngOnInit() {
  }

  archive(id) {
    
    var token = localStorage.getItem('token');
    this.body={
      "isArchived": true,
      "noteIdList": [this.noteDetails.id]
    }
    
    this.records = this.noteService.archive(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('Note archived', 'Successfully', {
        duration: 3000,
      });
      this.eventArchive.emit({
        
      })

    }, error => {
      
      this.snackBar.open('Note archiving', 'Failed', {
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
