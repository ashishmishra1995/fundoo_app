import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCollectionComponent } from '../note-collection/note-collection.component';
import { HttpService } from '../../core/service/http/http.service';

export interface DialogData {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements OnInit {
  note = {};
  @Output() eventUpdate=new EventEmitter();
  @Input() noteDetails;
  constructor(public dialogRef: MatDialogRef<NoteCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService: HttpService) { }

  ngOnInit() {
    this.labelname=this.data['noteLabels']
  }
  onNoClick(): void {
    var token = localStorage.getItem('token');
    this.note = {
      "noteId": [this.data.id],
      "title": document.getElementById('title').innerHTML,
      "description": document.getElementById('take-note').innerHTML
    }
    this.httpService.httpUpdateNote('notes/updateNotes', this.note, token).subscribe(result => {

      
      this.dialogRef.close();
      this.eventUpdate.emit({
        
      })

    });
    
  }
  labelBody={};
  removeLabel(noteId,labelId){
    
    this.labelBody={
      "noteId": noteId,
      "lableId": labelId
    }
    this.httpService.httpAddLabelToNotes('notes/'+noteId+'/addLabelToNotes/'+labelId+'/remove', localStorage.getItem('token'),this.labelBody).subscribe(result=>{
      console.log(result);
      this.eventUpdate.emit({

      })
    },error=>{
      console.log(error);
      
    })
  }
  public labelid=[];
  public labelname=[];
  labelEvent(event){
    if(this.labelname.indexOf(event)<0){
      this.labelid.push(event.id);
      this.labelname.push(event);
    }else{
      this.labelid.splice(this.labelid.indexOf(event),1)
      this.labelname.splice(this.labelname.indexOf(event),1)
    }
  }
}
