import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNotesComponent } from '@components/update-notes/update-notes.component';
import { DataServiceService } from "@service/data-service/data-service.service";
import { NoteService } from '@service/note-service/note-service.service';
import { CollaboratorComponent } from '@components/collaborator/collaborator.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollaboratorPopupComponent } from '@app/components/collaborator-popup/collaborator-popup.component';

@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.scss']
})
export class NoteCollectionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() notesArray;
  @Input() searchNote;
  @Input() length;
  @Input() string;
  @Output() onCollaborator=new EventEmitter();
  public checkArray=[];
  public isChecked=false;

  @Output() listEmit= new EventEmitter();
  labels=[];
  labelBody={};
  @Output() addEntry = new EventEmitter();
  search;
  constructor(private httpService: HttpService,
    public dialog: MatDialog,
    public data: DataServiceService,
    private NoteService: NoteService) { 
      this.data.currentEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(message=>{
        if(message){
          this.addEntry.emit();
        }
      })
    }
    condition=true;
    
  ngOnInit() {
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
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '500px',
      height:'300px',
      data: notes
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.addEntry.emit({

      })
    });
  }
  collabDialog(notes): void {
    const dialogRefCollab = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      height:'300px',
      data: notes
    });

    dialogRefCollab.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.addEntry.emit({

      })
    });
  }
  nextDelete(event){
    if(event){
      this.addEntry.emit({
        
      })
      
    }
  }
  removeLabel(noteId,labelId){
    this.labelBody={
      "noteId": noteId,
      "lableId": labelId
    }
    this.NoteService.removeLabelFromNotes(this.labelBody,noteId,labelId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
     
      this.addEntry.emit({

      })
    },error=>{

      
    })
  }
  public reminderBody={};
  removeReminder(id){
    this.reminderBody={
      "noteIdList":[id]
    }
    this.NoteService.deleteReminder(this.reminderBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{

      this.addEntry.emit({

      });
    })
  }
  addReminder($event){
    this.addEntry.emit({

    });
  }
  public modifiedCheckList
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }

    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
  
    this.NoteService.UpdateChecklist(JSON.stringify(apiData), id, this.modifiedCheckList.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {


    })
  }
  public todayDate= new Date();
  public tomorrowDate= new Date(this.todayDate.getFullYear(),this.todayDate.getMonth(), (this.todayDate.getDate()+1))
  public currDate= new Date(); 
  checkReminder(date){
  
    var showTime=new Date(date).getTime();
    var currTime=this.currDate.getTime();
    if(showTime<currTime){
      return true
    }else return false
    
  }
  openCollaborator(notes) : void{
    const dialogRef = this.dialog.open(CollaboratorPopupComponent, {
      width: '500px',
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onCollaborator.emit({})
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
