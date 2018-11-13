// import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { HttpService } from '../../core/service/http/http.service';
// import { MatSnackBar } from "@angular/material";

// @Component({
//   selector: 'app-add-note',
//   templateUrl: './add-note.component.html',
//   styleUrls: ['./add-note.component.scss']
// })
// export class AddNoteComponent implements OnInit {
//   show = true;
//   records = {};
//   notes = [];
//   note={};
//   checklist = [];
//   public title;
//   check=[];
//   public parentColor='#fafafa';
//   visible = true;
  
//   checked: boolean;
//   body = {
//     "title": "",
//     "description": "",
//     "color": "",
//     "checkList": []

//   }
//   checkBody={
//     'textVal':"",
//     'status':true
//   }
//   @Input() notesArray;
//   @Output() onNewEntryAdded = new EventEmitter();
//   // list = [2];
//   constructor(private httpService: HttpService,
//     public snackBar: MatSnackBar) {
    
//   }

//   ngOnInit() {
//     console.log("notes=> ", this.notesArray)
//   }
//   changeColor(event) {
//     if (event) {
//       this.parentColor = event;
//     }
//   }
  
//   addCheckBox(event){
//     this.visible=!this.visible;
//     //if ( this.checkBody.textVal != "") {
//       this.checklist.push({
//         'itemName':"",
//         'status':"open"
//       });
//       console.log("checklist=>", this.checklist);

//     //}
//   }
//   onKeydown(event,index) {

//     console.log(index);
    
//     if (event.key === "Enter" && this.checklist[parseInt(index)].textVal !="" &&  this.checklist.length-1 ==index) {
//       this.checklist.push({
//         'itemName':"",
//         'status':"open"
//       });
//     }else if(((event.keyCode === 46) || (event.keyCode=8))){
//       this.checklist.pop();
//     }
//   }
//   close() {
//     if ((!this.show) || (!this.visible)) {
//       this.show = !this.show;
      
//       var token = localStorage.getItem('token');
//       this.title = document.getElementById("title").innerHTML;
      
//       if(this.checklist.length != 0){

//         this.note = {
//           "title": this.title,
//           "color": this.parentColor,
//           "checklist": JSON.stringify(this.checklist)
//         }
//       }else{
//         this.note = {
//           "title": this.title,
//           "description": document.getElementById("take-note").innerHTML,
//           "color": this.parentColor,
//           "labelIdList": JSON.stringify(this.labelId)
          
//         }
//       }
      
//       this.parentColor = "#ffffff"
//       this.records = this.httpService.httpAddNote('notes/addNotes', token, this.note).subscribe(result => {
//         this.snackBar.open('Note added', 'Successfully', {
//           duration: 3000,
//         });
//         this.onNewEntryAdded.emit({

//         });
//         this.visible=!this.visible;
//       }, error => {
//         console.log(error);
//         this.snackBar.open('Note addition', 'Failed', {
//           duration: 3000,
//         });
//       });
//     }
//   }
  
//   public labelId=[];
//   public labelName=[];
//   labelEvent(event){
//     if(this.labelName.indexOf(event)<0){
//       this.labelId.push(event.id);
//       this.labelName.push(event);
//     }else{
//       this.labelId.splice(this.labelId.indexOf(event),1)
//       this.labelName.splice(this.labelName.indexOf(event),1)
//     }
//   }
//   // rem1=[];
//   // remToday(event){
//   //   if(this.rem1.indexOf(event)<0){
//   //     this.rem1.push(event);
//   //   }else{
//   //     this.rem1.splice(this.rem1.indexOf(event),1)
//   //   }
//   // }
// }






import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild} from '@angular/core';
import { NoteServiceService } from '../../core/service/note-service/note-service.service';


@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss']
  })

export class AddNoteComponent implements OnInit {
public title;
public note;
//public changedColor="#ffffff"
public parentColor='#ffffff';
  @Output() onNewEntryAdded = new EventEmitter();
 
//creating an object for eventEmitter
  constructor(private NoteService:NoteServiceService) { }
  @ViewChild('editDiv') public editDiv: ElementRef;

public clicked=false;
public labelId=[];
public checkList=[];
public dataArray=[];
public dataArrayApi=[];
public isChecked=false;
public status="open"
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
    //var apiColor=this.changedColor;
    this.parentColor = "#ffffff";
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
          "labelIdList": JSON.stringify(this.labelId)
        }
    
    }
      else{
        console.log("else part");
        
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
 console.log(this.dataArrayApi);
 
       this.body={
         "title": this.title,
         "checklist":JSON.stringify(this.dataArrayApi),
         "isPined": this.isPinned,
         "color": this.parentColor,
         "isArchived": this.isArchived,
         "labelIdList": JSON.stringify(this.labelId)
        }
 }
if (this.title != "") {
  this.NoteService.NewNote(this.getFormUrlEncoded(this.body)).subscribe(response=>{
   
      this.labelId = []
      this.labelName=[];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding=false
      //emitting an event when the note is added
      this.onNewEntryAdded.emit({})         
    },error=>{
      console.log(error);
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
  // colorChanged(event){
  //   this.changedColor=event;
  // }
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
    console.log("add component label",event)
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
    console.log(event,"keydown");
    var obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)
    console.log(this.dataArray);
    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  onDelete(deletedObj){
    console.log("onDelete function");
       for(var i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }
        
      }
    console.log(this.dataArray)
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
  }


