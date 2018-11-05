import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { DataServiceService } from "../../service/data-service/data-service.service";
import { Condition } from 'selenium-webdriver';
@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.css']
})
export class NoteCollectionComponent implements OnInit {
  
  @Input() notesArray;
  @Input() searchNote;
  labels=[];
  labelBody={};
  @Output() addEntry = new EventEmitter();
  search;
  constructor(private httpService: HttpService,
    public dialog: MatDialog,
    public data: DataServiceService) { 
      this.data.currentEvent.subscribe(message=>{
        if(message){
          this.addEntry.emit();
        }
      })
    }

  ngOnInit() {
    
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
  condition=true;
  view(){
    this.condition=!this.condition;
  }
}
