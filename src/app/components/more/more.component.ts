import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { MatSnackBar } from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddLabelComponent } from '@components/add-label/add-label.component';
import { DataServiceService } from '@service/data-service/data-service.service';
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public title;
  public note;
  public id;
  public notes=[];
  public labels=[];
  public records = {};
  public labelBody={};
  public body={
    
    "isDeleted": true,
    "noteIdList": []
  }
  @Input() noteDetails;
  @Output() eventDelete = new EventEmitter();
  @Output() addEvent=new EventEmitter();
  search;
  constructor(private httpService: HttpService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private data: DataServiceService,
    private noteService: NoteService,
    private router: Router) { }

  ngOnInit() {
    var token=localStorage.getItem('token');
      this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result=>{
  
        for(var i=0; i<result['data']['details'].length; i++)
        {
          this.labels.push(result['data']['details'][i])
        }
      },error=>{

      })
      this.data.currentDataSearch
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.search = message

      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLabelComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      
    });
  }
  delete(id) {
    
    // var token = localStorage.getItem('token');
    this.body={
      "isDeleted": true,
      "noteIdList": [this.noteDetails.id]
    }
    this.records = this.noteService.trash(this.body)
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
  addLabel(label){
    this.addEvent.emit(label);
    this.labelBody={
      "noteId": this.noteDetails.id,
      "lableId": label.id
    }
    this.noteService.addLabeltoNotes(this.labelBody,this.noteDetails.id,label.id)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(result=>{

      this.eventDelete.emit({

      })
    },error=>{
  
    })
  }
  labBody={
    "data":""
  }
  onKeyUp(event){
    this.labBody.data=event.target.value;
    this.data.searchData(this.labBody.data);
  }
  askQuestion(){
    this.router.navigate(['/home/notes/' + this.noteDetails.id + '/QuestionAndAnswers'])
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
