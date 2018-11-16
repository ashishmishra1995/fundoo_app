import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { DataServiceService } from "../../core/service/data-service/data-service.service";
import { NoteServiceService } from '../../core/service/note-service/note-service.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.scss']
})
export class NoteCollectionComponent implements OnInit {
  
  @Input() notesArray;
  @Input() searchNote;
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
    private NoteService: NoteServiceService) { 
      this.data.currentEvent.subscribe(message=>{
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
    this.data.currentMessage.subscribe(message=>{
      this.toggle=message;
    })
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '500px',
      height:'300px',
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
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

    dialogRefCollab.afterClosed().subscribe(result => {
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
    this.httpService.httpAddLabelToNotes('notes/'+noteId+'/addLabelToNotes/'+labelId+'/remove', localStorage.getItem('token'),this.labelBody).subscribe(result=>{
      console.log(result);
      this.addEntry.emit({

      })
    },error=>{
      console.log(error);
      
    })
  }
  public reminderBody={};
  removeReminder(id){
    this.reminderBody={
      "noteIdList":[id]
    }
    this.httpService.httpArchiveNote('notes/removeReminderNotes', this.reminderBody,localStorage.getItem('token')).subscribe(result=>{
      console.log(result);
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
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
  
    this.NoteService.UpdateChecklist(JSON.stringify(apiData), id, this.modifiedCheckList.id)
    .subscribe(response => {
      console.log(response);

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
}
