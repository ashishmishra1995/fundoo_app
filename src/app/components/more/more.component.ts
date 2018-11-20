import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { MatSnackBar } from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddLabelComponent } from '../add-label/add-label.component';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { NoteService } from "../../core/service/note-service/note-service.service";

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
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
  private noteService: NoteService) { }

  ngOnInit() {
    var token=localStorage.getItem('token');
      this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token).subscribe(result=>{
        // console.log(result);
        for(var i=0; i<result['data']['details'].length; i++)
        {
          this.labels.push(result['data']['details'][i])
        }
      },error=>{
        console.log(error);
      })
      this.data.currentDataSearch.subscribe(message => {
        this.search = message
        console.log("search data: ",this.search)
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLabelComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  delete(id) {
    
    var token = localStorage.getItem('token');
    this.body={
      "isDeleted": true,
      "noteIdList": [this.noteDetails.id]
    }
    this.records = this.noteService.trash(this.body).subscribe(result => {
      this.snackBar.open('Note deleted', 'Successfully', {
        duration: 3000,
      });
      console.log(this.noteDetails.id);
      this.eventDelete.emit({

      })
    }, error => {
      console.log(error);
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
    this.noteService.addLabeltoNotes(this.labelBody,this.noteDetails.id,label.id).subscribe(result=>{
      console.log(result);
      this.eventDelete.emit({

      })
    },error=>{
      console.log(error);
    })
  }
  labBody={
    "data":""
  }
  onKeyUp(event){
    this.labBody.data=event.target.value;
    this.data.searchData(this.labBody.data);
    console.log(this.labBody.data);
  }

}
