import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { Note } from "../../core/model/note";
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  records={};
  private notes : Note[]=[];
  public pinnedNotes=[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getNotes();
    // this.getPinnedNotes();
  }
  addNewEntry(event){
    if(event){
      this.getNotes();
      // this.getPinnedNotes();
    }
  }

  newNote(noteData :Note){
    //if(event){
      this.notes.splice(0,0,noteData);
      // this.getPinnedNotes();
    //}
  }
  getNotes(){
    
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getNotesList',token).subscribe(result=>{
      console.log(result);
      var mydata:Note[]=result['data']['data']; 
      console.log("mydata",mydata);
      // mydata[0].noteLabels[0]
      this.notes =[];
      for(var i=mydata.length-1; i>=0; i--){
        if(mydata[i].isDeleted==false && mydata[i].isArchived==false && mydata[i].isPined==false){
        this.notes.push(mydata[i]);
        }
      }
          console.log(this.notes);
      
    },error=>{
      console.log(error);
    });
  }

  getPinnedNotes(){
    
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getNotesList',token).subscribe(result=>{
      console.log(result);
      this.pinnedNotes =[];
      for(var i=result['data']['data'].length-1; i>=0; i--){
        if(result['data']['data'][i].isDeleted==false && result['data']['data'][i].isPined==true){
        this.pinnedNotes.push(result['data']['data'][i])
        }
      }
   
          console.log(this.pinnedNotes);
      
    },error=>{
      console.log(error);
    });
  }
  
}
