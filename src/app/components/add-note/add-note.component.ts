import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { NoteService } from '@service/note-service/note-service.service';
import { Note } from "@model/note";
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss']
  })

export class AddNoteComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
private title;
private note;
private parentColor='#ffffff';
  @Output() onNewEntryAdded = new EventEmitter();
  @Output() onNewData =new EventEmitter();
 
//creating an object for eventEmitter
  constructor(private NoteService:NoteService) { }
  @ViewChild('editDiv') public editDiv: ElementRef;

public clicked=false;
public labelId=[];
public checkList=[];
public dataArray=[];
public dataArrayApi=[];
public isChecked=false;
public status="open"
//public notes: Note
  ngOnInit() {

  }
  public isPinned = false;
  public isArchived=false;
  public body:any={}
  public check=false;
  changeColor(event) {
        if (event) {
          this.parentColor = event;
        }
      }
  addNotes(){
  
    this.title = document.getElementById("title").innerHTML;
    this.clicked = !this.clicked;

    //binding values from the html page
    if(this.check==false){
    this.note=document.getElementById("note").innerHTML;
    //calling the api to add the Note through services
   
           this.body={
          "title": this.title,
          "description": this.note,
          "isPined": this.isPinned,
          "color": this.parentColor,
          "isArchived": this.isArchived,
          "labelIdList": JSON.stringify(this.labelId),
          "reminder":''
        }
        if(this.reminderVariable!=undefined){
          this.body.reminder=this.reminderVariable
        }
    }
      else{
        
        
 for(var i=0;i<this.dataArray.length;i++){
   if(this.dataArray[i].isChecked==true){
    this.status="close"
   }
   var apiObj={
     "itemName":this.dataArray[i].data,
     "status":this.status
   }
   this.dataArrayApi.push(apiObj)
   this.status="open"
 }
 
 
       this.body={
         "title": this.title,
         "checklist":JSON.stringify(this.dataArrayApi),
         "isPined": this.isPinned,
         "color": this.parentColor,
         "isArchived": this.isArchived,
         "labelIdList": JSON.stringify(this.labelId),
         "reminder":this.reminderVariable
        }
 }
if (this.title != "") {
  this.NoteService.NewNote(this.getFormUrlEncoded(this.body))
  .pipe(takeUntil(this.destroy$))
  .subscribe(response =>{
   
      this.labelId = []
      this.labelName=[];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.reminderVariable=''
      this.reminderArray=[];
      this.adding=false
      //emitting an event when the note is added
      //this.onNewEntryAdded.emit({}) 
      this.onNewData.emit(response["status"].details); 
      this.parentColor = "#ffffff";       
    },error=>{
   
      this.labelId = []
      this.labelName = [];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding = false

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
   pinEvent(event){
      this.isPinned=true;
   }
 
  public labelName=[];
  labelEvent(event){
    if(this.labelName.indexOf(event)<0){
      this.labelId.push(event.id);
      this.labelName.push(event)
    }
    else{
      this.labelName.splice(this.labelName.indexOf(event),1);
      this.labelId.splice(this.labelId.indexOf(event), 1);
    }
    
  }
  public data;
  public i=0;
  public adding=false;
  public addCheck=false;
  onEnter(event){
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
   this.i++;
   this.isChecked=this.addCheck
    if (this.data != null && event.code == "Enter"){
    
    var obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)
    
    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  onDelete(deletedObj){
    
       for(var i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }
        
      }
 
  }
 
  deleteLabel(label){
    this.labelName.splice(this.labelName.indexOf(label), 1);
    this.labelId.splice(this.labelId.indexOf(label), 1);
  }
  archiveEvent(event){
    this.isArchived=true;
  }
  checklist($event){
    this.check=true;
  }
  public reminderVariable;
  public reminderArray=[];
  notes={
    'id':''
  }
  reminderEvent(event){
    if(event){
      this.reminderVariable=event;
      if(this.reminderArray.length==0){
        this.reminderArray.push(this.reminderVariable);
      }
      
    }
  }
  deleteReminder(){
    this.reminderArray.pop();
    this.reminderVariable = '';
  }
  public todayDate= new Date();
  public tomorrowDate= new Date(this.todayDate.getFullYear(),this.todayDate.getMonth(), (this.todayDate.getDate()+1))
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }