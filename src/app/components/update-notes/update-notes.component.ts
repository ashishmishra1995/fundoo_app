import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCollectionComponent } from '../note-collection/note-collection.component';
import { HttpService } from '../../core/service/http/http.service';
import { NoteServiceService } from '../../core/service/note-service/note-service.service';

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
  public checklist=false;
  public modifiedCheckList;
  public newList;
  public tempArray=[];
  public newData:any={};
  public arrayObj:any={};
  public dataArray=[];
  public bgcolor=this.data.color;

  constructor(public dialogRef: MatDialogRef<NoteCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private NoteService:NoteServiceService) { }

  ngOnInit() {
    this.tempArray=[];
    this.labelname=this.data['noteLabels'];
    if (this.data.noteCheckLists.length>0){
      this.checklist=true;
    }
    this.tempArray=this.data.noteCheckLists;
  }
  
  onNoClick(): void {
    
    var token = localStorage.getItem('token');
    if(this.checklist==false){
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
  }else{
    var apiData={
      "itemName": this.modifiedCheckList.itemName,
      "status":this.modifiedCheckList.status
 }
 
   this.NoteService.UpdateChecklist(JSON.stringify(apiData), this.data.id, this.modifiedCheckList.id)
  .subscribe(response => {
     console.log(response,"checklist updated");
     this.dialogRef.close();
      this.eventUpdate.emit({
        
      })
   })
  }
    
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  
    editing(editedList,event){
      
      console.log(editedList);
      if(event.code=="Enter"){
      this.modifiedCheckList=editedList;
      this.onNoClick();
      }
    }
    colorChanged(event){
      this.bgcolor=event; 
    }
    checkBox(checkList){
    
      if (checkList.status=="open"){
        checkList.status = "close"
      }
      else{
        checkList.status = "open"
      }
      console.log(checkList);
      this.modifiedCheckList=checkList;
      this.onNoClick();
    }
    public removedList;
    removeList(checklist){
      console.log(checklist)
      this.removedList=checklist;
      this.removeCheckList()
    }
    removeCheckList(){
      this.NoteService.removeChecklist(null, this.data.id, this.removedList.id)
      .subscribe(response => {
        console.log(response);
        for(var i=0;i<this.tempArray.length;i++){
          if(this.tempArray[i].id==this.removedList.id){
            this.tempArray.splice(i,1)
          }
        }
      })
    }
   
    public adding=false;
    public addCheck=false;
    public status="open"
    addList(event){
      if(this.newList!=""){
        this.adding = true;
      }
     else{
        this.adding = false;
     }
      if (event.code == "Enter") {
        if(this.addCheck==true){
          this.status="close";
        }
        else{
          this.status="open"
        }
        this.newData={
          "itemName":this.newList,
          "status":this.status
        }
      this.NoteService.addChecklist(this.newData,this.data.id)
      .subscribe(response => {
        console.log(response);
        this.newList=null;
        this.addCheck=false;
        this.adding=false;
        console.log(response['data'].details);
        
        this.tempArray.push(response['data'].details)
  
        console.log(this.tempArray)
  
      })
    }
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
  public colorUpdate='#ffffff'
  changeColor(event){
    this.colorUpdate=event;
  }
}
