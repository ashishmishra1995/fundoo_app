import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  show = true;
  records = {};
  notes = [];
  note={};
  checklist = [];
  public title;
  check=[];
  public parentColor='#fafafa';
  visible = true;
  
  checked: boolean;
  body = {
    "title": "",
    "description": "",
    "color": "",
    "checkList": []

  }
  checkBody={
    'textVal':"",
    'status':true
  }
  @Input() notesArray;
  @Output() onNewEntryAdded = new EventEmitter();
  // list = [2];
  constructor(private httpService: HttpService,
    public snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    console.log("notes=> ", this.notesArray)
  }
  changeColor(event) {
    if (event) {
      this.parentColor = event;
    }
  }
  
  addCheckBox(event){
    this.visible=!this.visible;
    //if ( this.checkBody.textVal != "") {
      this.checklist.push({
        'itemName':"",
        'status':"open"
      });
      console.log("checklist=>", this.checklist);

    //}
  }
  onKeydown(event,index) {

    console.log(index);
    
    if (event.key === "Enter" && this.checklist[parseInt(index)].textVal !="" &&  this.checklist.length-1 ==index) {
      this.checklist.push({
        'itemName':"",
        'status':"open"
      });
    }else if(((event.keyCode === 46) || (event.keyCode=8))){
      this.checklist.pop();
    }
  }
  close() {
    if ((!this.show) || (!this.visible)) {
      this.show = !this.show;
      
      var token = localStorage.getItem('token');
      this.title = document.getElementById("title").innerHTML;
      
      if(this.checklist.length != 0){

        this.note = {
          "title": this.title,
          "color": this.parentColor,
          "checklist": JSON.stringify(this.checklist)
        }
      }else{
        this.note = {
          "title": this.title,
          "description": document.getElementById("take-note").innerHTML,
          "color": this.parentColor,
          "labelIdList": JSON.stringify(this.labelId)
          
        }
      }
      
      this.parentColor = "#ffffff"
      this.records = this.httpService.httpAddNote('notes/addNotes', token, this.note).subscribe(result => {
        this.snackBar.open('Note added', 'Successfully', {
          duration: 3000,
        });
        this.onNewEntryAdded.emit({

        });
        this.visible=!this.visible;
      }, error => {
        console.log(error);
        this.snackBar.open('Note addition', 'Failed', {
          duration: 3000,
        });
      });
    }
  }
  
  public labelId=[];
  public labelName=[];
  labelEvent(event){
    if(this.labelName.indexOf(event)<0){
      this.labelId.push(event.id);
      this.labelName.push(event);
    }else{
      this.labelId.splice(this.labelId.indexOf(event),1)
      this.labelName.splice(this.labelName.indexOf(event),1)
    }
  }
  // rem1=[];
  // remToday(event){
  //   if(this.rem1.indexOf(event)<0){
  //     this.rem1.push(event);
  //   }else{
  //     this.rem1.splice(this.rem1.indexOf(event),1)
  //   }
  // }
}



