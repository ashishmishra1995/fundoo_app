import { Component, OnInit, Inject, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCollectionComponent } from '@components/note-collection/note-collection.component';
import { HttpService } from '@service/http/http.service';
import { NoteService } from '@service/note-service/note-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LoggerService } from '@app/core/service/logger/logger.service';
import { UserService } from '@app/core/service/user-service/user.service';

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
export class UpdateNotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
    private NoteService:NoteService,
    private userService:UserService) { }

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
    this.httpService.httpUpdateNote('notes/updateNotes', this.note, token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {

      
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
   .pipe(takeUntil(this.destroy$))
   .subscribe(response => {
    
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
    
      this.modifiedCheckList=checkList;
      this.onNoClick();
    }
    public removedList;
    removeList(checklist){

      this.removedList=checklist;
      this.removeCheckList()
    }
    removeCheckList(){
      this.NoteService.removeChecklist(null, this.data.id, this.removedList.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
     
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
      
        this.newList=null;
        this.addCheck=false;
        this.adding=false;
   
        
        this.tempArray.push(response['data'].details)
  

  
      })
    }
    }

  labelBody={};
  removeLabel(noteId,labelId){
    
    this.labelBody={
      "noteId": noteId,
      "lableId": labelId
    }
    this.httpService.httpAddLabelToNotes('notes/'+noteId+'/addLabelToNotes/'+labelId+'/remove', localStorage.getItem('token'),this.labelBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{

      this.eventUpdate.emit({

      })
    },error=>{

      
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

  collab=true;
   collaborator(){
    this.collab=!this.collab;
    LoggerService.log("collab",true);
  }
  private image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName');
  private email = localStorage.getItem('email');

  private requestBody = {
    "searchWord": ""
  }
  private userList = [];
  private collaborators=[]
  searchUser() {
    this.userService.searchUser(this.requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.userList = result['data']['details']
      
    })
  }
  addCollaborator(userDetails) {
    
    let collaboratorBody = {
      "firstName": userDetails.firstName,
      "lastName": userDetails.lastName,
      "email": userDetails.email,
      "userId": userDetails.userId
    }
    this.collaborators.push(collaboratorBody);
    this.requestBody.searchWord="";
    
  }
  removeCollaborator(collaboratorId){
    for(let i=0; i<this.collaborators.length; i++){
      if(collaboratorId==this.collaborators[i].userId){
        this.collaborators.splice(i,1);
      }
    }

  }
  closeCollaborator(){
    this.collab=!this.collab
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
